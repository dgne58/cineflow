import cloudinary
import cloudinary.uploader
import cv2
import requests
import time
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.layers import Input, Dense, Concatenate, LayerNormalization, Conv2D, Add, Dropout, Reshape, UpSampling2D, BatchNormalization, AveragePooling2D
import keras

@keras.saving.register_keras_serializable()
class embedify(tf.keras.layers.Layer):
    def __init__(self, patch_size, emb_dim, **kwargs):
        super(embedify, self).__init__(**kwargs)
        self.emb_dim = emb_dim
        self.patch_size = patch_size
        self.conv_emb = Conv2D(filters=self.emb_dim, kernel_size=self.patch_size, strides=self.patch_size)
        self.CLS_token = self.add_weight(name="CLS_token", shape=(1, 1, self.emb_dim), initializer="random_normal", trainable=True)

    def build(self, input_shape):
        num_patches = (input_shape[1] // self.patch_size) * (input_shape[2] // self.patch_size)
        self.pos_emb = self.add_weight(name="pos_emb", shape=(1, num_patches+1, self.emb_dim), initializer="random_normal", trainable=True)
        self.conv_emb.build(input_shape)
        super().build(input_shape)

    def call(self, x):
        batch_size = tf.shape(x)[0]
        x = self.conv_emb(x)
        x = tf.reshape(x, (batch_size, tf.shape(x)[1]*tf.shape(x)[2], self.emb_dim))
        CLS = tf.tile(self.CLS_token, [batch_size, 1, 1])
        x = tf.concat([CLS, x], axis=1)
        x += self.pos_emb
        return x

    def get_config(self):
        config = super().get_config()
        config.update({"patch_size": self.patch_size, "emb_dim": self.emb_dim})
        return config

    def compute_output_shape(self, input_shape):
        h, w = input_shape[1], input_shape[2]
        num_patches = (h // self.patch_size) * (w // self.patch_size)
        return (input_shape[0], num_patches, self.emb_dim)

@keras.saving.register_keras_serializable()
class attentify(tf.keras.layers.Layer):
    def __init__(self, emb_dim, **kwargs):
        super().__init__(**kwargs)
        self.emb_dim = emb_dim
        self.Q = self.add_weight(shape=(emb_dim, emb_dim), initializer='glorot_uniform', name='Q', trainable=True)
        self.K = self.add_weight(shape=(emb_dim, emb_dim), initializer='glorot_uniform', name='K', trainable=True)

    def call(self, x):
        Qx = tf.matmul(x, self.Q)
        Kx = tf.matmul(x, self.K)
        A = tf.matmul(Qx, Kx, transpose_b=True) / tf.math.sqrt(tf.cast(self.emb_dim, tf.float32))
        A = tf.nn.softmax(A)
        x = tf.matmul(A, x) + x
        return x

    def get_config(self):
        config = super().get_config()
        config.update({"emb_dim": self.emb_dim})
        return config

    def compute_output_shape(self, input_shape):
        return input_shape

@keras.saving.register_keras_serializable()
class MLPify(tf.keras.layers.Layer):
    def __init__(self, emb_dim, expansion_multiplier, **kwargs):
        super().__init__(**kwargs)
        self.emb_dim = emb_dim
        self.expansion_multiplier = expansion_multiplier
        self.denseUp = Dense(self.emb_dim * self.expansion_multiplier, activation="gelu")
        self.denseDown = Dense(self.emb_dim, activation="gelu")
        self.dropout = Dropout(0.1)

    def call(self, x, training=False):
        dx = self.denseUp(x)
        dx = self.denseDown(dx)
        dx = self.dropout(dx, training=training)
        x = x + dx
        return x

    def get_config(self):
        config = super().get_config()
        config.update({"emb_dim": self.emb_dim, "expansion_multiplier": self.expansion_multiplier})
        return config

@keras.saving.register_keras_serializable()
class transformify(tf.keras.layers.Layer):
    def __init__(self, emb_dim, head_no, dropout, **kwargs):
        super().__init__(**kwargs)
        self.attentifys = [attentify(emb_dim) for _ in range(head_no)]
        self.emb_dim = emb_dim
        self.mlp = MLPify(emb_dim, 4)
        self.layernorm1 = LayerNormalization(epsilon=1e-6)
        self.dense_projection = Dense(emb_dim)
        self.layernorm2 = LayerNormalization(epsilon=1e-6)
        self.dropout1 = Dropout(dropout)
        self.dropout2 = Dropout(dropout)

    def call(self, x, training=False):
        x = self.layernorm1(x)
        attn = [att(x) for att in self.attentifys]
        x = tf.concat(attn, axis=-1)
        x = self.dense_projection(x)
        x = self.dropout1(x, training=training)
        x = self.layernorm2(x)
        x = self.mlp(x, training=training)
        x = self.dropout2(x, training=training)
        return x

    def get_config(self):
        config = super().get_config()
        config.update({"emb_dim": self.emb_dim, "head_no": len(self.attentifys), "dropout": self.dropout1.rate})
        return config

# Load ViT model
vit = tf.keras.models.load_model(r'server\ViT_Weights.keras')

onehot2label = {
    0: "Slow Motion",
    1: "Wide Shot",
    2: "Close-up",
    3: "High Angle",
    4: "Low Angle",
    5: "Cinematic Lighting",
    6: "Blurred Background",
    7: "Fast Motion",
    8: "Dynamic Movement",
    9: "Hyper-realistic Detail"
}


def predict(img_tensor):
    if img_tensor.shape != (512, 512, 3):
        img = cv2.resize(img_tensor, (512, 512))
        if len(img.shape) == 2:
            img = np.stack([img]*3, axis=-1)
        elif img.shape[2] == 1:
            img = np.concatenate([img]*3, axis=-1)
    else:
        img = img_tensor
    img = img.astype('float32') / 255.0
    img = np.expand_dims(img, axis=0)
    pdf = vit.predict(img)
    return onehot2label[pdf.argmax()], pdf.max()

cloudinary.config(
    cloud_name='dhxb6439h',
    api_key='511144413344935',
    api_secret='yMgQRS5hMF7xu2ZVFaGZ3Jhhdk8',
    secure=True
)

LUMA_API_KEY = "luma-25f62ea8-34d5-42b6-ae9f-32a7ed2cad76-1d79042c-cdf4-4b57-8a25-8b946245180f"


def extract_and_upload_frames(video1_path, video2_path):
    cap1 = cv2.VideoCapture(video1_path)
    cap2 = cv2.VideoCapture(video2_path)
    if not cap1.isOpened() or not cap2.isOpened():
        print("Error opening one of the video files")
        return None, None, None

    # Last frame from video1
    total_frames1 = int(cap1.get(cv2.CAP_PROP_FRAME_COUNT))
    frame = None
    cap1.set(cv2.CAP_PROP_POS_FRAMES, total_frames1 - 5)
    while True:
        ret, temp = cap1.read()
        if not ret:
            break
        frame = temp
    if frame is None:
        print("Failed to extract last frame from video1.")
        return None, None, None
    last_filename = 'last_frame_v1.jpg'
    cv2.imwrite(last_filename, frame)

    # First frame from video2
    cap2.set(cv2.CAP_PROP_POS_FRAMES, 0)
    ret2, first_frame_v2 = cap2.read()
    if not ret2 or first_frame_v2 is None:
        print("Failed to extract first frame from video2.")
        return None, None, None
    first_filename = 'first_frame_v2.jpg'
    cv2.imwrite(first_filename, first_frame_v2)

    # Predict and generate prompt
    p1 = predict(frame)[0]
    p2 = predict(first_frame_v2)[0]
    prompt = p2 if p1 == p2 else f"{p1} to {p2}"

    cap1.release()
    cap2.release()

    resp1 = cloudinary.uploader.upload(last_filename)
    resp2 = cloudinary.uploader.upload(first_filename)
    last_url = resp1.get('secure_url')
    first_url = resp2.get('secure_url')

    # Clean up frame files
    try:
        os.remove(last_filename)
        os.remove(first_filename)
    except OSError as e:
        print(f"Frame cleanup error: {e}")

    return last_url, first_url, prompt


def generate_transition_luma(start_image_url, end_image_url, prompt="Smooth cinematic transition between the two scenes"):
    endpoint = "https://api.lumalabs.ai/dream-machine/v1/generations"
    payload = {
        "model": "ray-2",
        "prompt": prompt,
        "duration": "5s",
        "aspect_ratio": "16:9",
        "resolution": "540p",
        "keyframes": {
            "frame0": {"type": "image", "url": start_image_url},
            "frame1": {"type": "image", "url": end_image_url}
        }
    }
    headers = {
        "Authorization": f"Bearer {LUMA_API_KEY}",
        "Content-Type": "application/json"
    }
    try:
        resp = requests.post(endpoint, json=payload, headers=headers)
        resp.raise_for_status()
        data = resp.json()
        gen_id = data.get('id') or (data[0].get('id') if isinstance(data, list) else None)
        if not gen_id:
            print("Failed to start generation.")
            return None
        status_url = f"{endpoint}/{gen_id}"
        for _ in range(36):
            st = requests.get(status_url, headers=headers)
            st.raise_for_status()
            js = st.json()
            state = js.get('state') or js.get('status')
            if state == 'completed':
                vid = js.get('assets', {}).get('video')
                if vid:
                    return vid
                return None
            if state in ('failed','rejected'):
                return None
            time.sleep(10)
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None


if __name__ == "__main__":
    import sys
    v1, v2 = sys.argv[1], sys.argv[2]
    try:
        print("--- Extract & Upload ---")
        u1, u2, prompt = extract_and_upload_frames(v1, v2)
        if u1 and u2:
            print("--- Generate Transition ---")
            url = generate_transition_luma(u1, u2, prompt)
            if url:
                print(f"Prompt suggestion: {prompt}")
                print(f"Got transition video: {url}")
            else:
                print("Generation failed.")
        else:
            print("Frame upload failed.")
    finally:
        for filepath in (v1, v2):
            try:
                os.remove(filepath)
            except OSError as e:
                print(f"Input cleanup error for {filepath}: {e}")
