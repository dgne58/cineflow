# Cineflow 🎬

Cineflow is an AI-powered video transition generator that creates seamless, professional-quality transitions between video clips. Using advanced machine learning techniques and computer vision, it automatically analyzes your videos and generates smooth, context-aware transitions that match your desired style.

## 🌟 Features

- **Smart Transition Generation**: Automatically creates smooth transitions between any two video clips
- **AI-Powered Style Detection**: Analyzes video scenes to determine optimal transition styles
- **Customizable Options**:
  - Duration control (5-9 seconds)
  - Multiple aspect ratios (9:16, 16:9, 1:1, 3:4, 4:3)
  - Resolution options (1080p, 720p, 540p)
- **Prompt-Based Customization**: Describe your desired transition style in natural language
- **Real-Time Preview**: Watch your generated transitions instantly in the browser

## 🚀 Technologies Used

- **Frontend**:
  - React
  - Tailwind CSS
  - Vite (for development and building)
  - Axios (for API requests)

- **Backend**:
  - Python
  - TensorFlow (Vision Transformer model)
  - OpenCV (video processing)
  - Flask/FastAPI (API server)

- **AI/ML**:
  - Custom Vision Transformer (ViT) for scene analysis
  - Luma AI for transition generation
  - Cloudinary for media handling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

## 🛠️ Setup and Installation

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

4. **Set up environment variables**
   Create a `.env` file in the root directory and add your API keys:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   LUMA_API_KEY=your_luma_api_key
   ```

5. **Start the development server**
   ```bash
   # Start the frontend
   npm run dev

   # In a separate terminal, start the backend
   python server/app.py
   ```

## 🎯 Usage

1. Open the application in your browser (typically at `http://localhost:5173`)
2. Upload two video clips you want to transition between
3. Customize your transition settings:
   - Select desired duration
   - Choose aspect ratio
   - Set resolution
   - Enter a prompt describing your desired transition style
4. Click "Send it to the moon 🚀" to generate your transition
5. Preview and download your generated transition

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Luma AI](https://lumalabs.ai/) for their powerful video generation API
- [Cloudinary](https://cloudinary.com/) for media management
- The open-source community for various tools and libraries used in this project
