# cineflow

Cineflow is an AI-powered video transition tool that creates smooth transitions between video clips. It uses machine learning and computer vision to analyze videos and automatically generate transitions tailored to your desired style.

## Features

- **Automatic Transitions**: Creates smooth transitions between two video clips.
- **Scene Analysis**: Determines the best transition style based on video content.
- **Custom Options**:
  - Transition length (5-9 seconds)
  - Aspect ratios (9:16, 16:9, 1:1, 3:4, 4:3)
  - Resolution choices (1080p, 720p, 540p)
- **Text-Based Prompts**: Describe your transition style simply in words.
- **Instant Preview**: View generated transitions directly in your browser.

## Technologies

- **Frontend**:
  - React
  - Tailwind CSS
  - Vite
  - Axios

- **Backend**:
  - Python
  - TensorFlow (Vision Transformer model)
  - OpenCV
  - Flask/FastAPI

- **AI/ML**:
  - Vision Transformer (ViT)
  - Luma AI
  - Cloudinary

## Prerequisites

Make sure you have:
- Node.js (v16+)
- Python (v3.8+)
- npm or yarn

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cineflow.git
   cd cineflow
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   Create a `.env` file:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   LUMA_API_KEY=your_luma_api_key
   ```

5. **Start servers**
   ```bash
   npm run dev

   # In another terminal
   python server/app.py
   ```

## Usage

1. Go to `http://localhost:5173`
2. Upload two videos
3. Choose transition settings:
   - Duration
   - Aspect ratio
   - Resolution
   - Prompt for style
4. Generate your transition
5. Preview and download the result

## Contributing

Contributions are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## License

Licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
