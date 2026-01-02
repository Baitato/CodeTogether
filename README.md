# CodeTogether

A real-time collaborative coding platform that allows multiple users to code together, solve problems, and execute code in various programming languages.

## Features

- 🔐 **Google OAuth Authentication** - Secure login with Google accounts
- 💻 **Multi-language Code Execution** - Support for C++, Java, and Python
- 🔄 **Real-time Collaboration** - Code together with Socket.io powered live sync
- 📝 **Problem Management** - Create and solve coding problems
- 🎨 **Modern UI** - Built with React and NextUI components
- 🐳 **Dockerized** - Easy deployment with Docker Compose

## Tech Stack

### Frontend
- React 18 with TypeScript
- Redux Toolkit for state management
- CodeMirror for code editing
- NextUI for UI components
- Tailwind CSS for styling
- Socket.io Client for real-time communication

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- Redis for job queue management (Bull)
- Passport.js for authentication
- Socket.io for WebSocket connections

### DevOps
- Docker & Docker Compose
- Multi-container architecture

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Redis
- Docker & Docker Compose (optional)

## Getting Started

### Environment Variables

Create a `.env` file in the `server` directory:

```env
MONGO_URI=mongodb://localhost:27017/codetogether
PORT=5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/codetogether.git
   cd codetogether
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Start the development servers**

   **Using Docker Compose:**
   ```bash
   docker-compose up
   ```

   **Or manually:**
   ```bash
   # Start the server (from server directory)
   npm start

   # Start the client (from client directory)
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

```
CodeTogether/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Configuration files
│   ├── middleware/        # Express middlewares
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── codes/             # Generated code files (gitignored)
│   ├── outputs/           # Execution outputs (gitignored)
│   └── package.json
├── docker-compose.yml
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/code` | Execute code |
| GET | `/api/problem` | Get all problems |
| POST | `/api/problem` | Create a problem |
| GET | `/api/auth` | Authentication routes |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [CodeMirror](https://codemirror.net/) for the code editor
- [Socket.io](https://socket.io/) for real-time communication
- [NextUI](https://nextui.org/) for beautiful UI components
