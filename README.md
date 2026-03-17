# SwiftChat - Real-Time Chat Application

![SwiftChat Logo](https://via.placeholder.com/150x50?text=SwiftChat) <!-- Replace with actual logo if available -->

A modern, scalable real-time chat application built with Node.js, Express, Socket.io, React, and TypeScript. Designed for seamless communication with features like direct messaging, group chats, friend requests, and real-time notifications.

## 🚀 Features

- **Real-Time Messaging**: Instant message delivery using WebSockets (Socket.io)
- **User Authentication**: Secure JWT-based authentication with refresh tokens
- **Direct & Group Chats**: Support for one-on-one and group conversations
- **Friend System**: Send friend requests, manage friendships
- **File Uploads**: Cloudinary integration for image sharing
- **Responsive UI**: Modern React interface with Tailwind CSS and Radix UI components
- **State Management**: Efficient state handling with Zustand
- **API Documentation**: Comprehensive Swagger documentation
- **Cross-Platform**: Works on desktop and mobile browsers

## 🛠 Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time communication
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Cloudinary** - Image hosting and management
- **Swagger** - API documentation

### Frontend

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Zustand** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Socket.io-client** - Real-time client

## 📁 Project Structure

```
SwiftChat_RealtimeChatApplication/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middlewares/     # Custom middleware
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── socket/         # WebSocket handlers
│   │   ├── utils/          # Helper functions
│   │   ├── libs/           # Database connection
│   │   ├── server.js       # Main server file
│   │   └── swagger.json    # API documentation
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   ├── stores/         # Zustand state stores
│   │   ├── types/          # TypeScript type definitions
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
│   ├── public/             # Static assets
│   └── package.json
└── README.md
```

## 🏗 Architecture

### Backend Architecture

- **MVC Pattern**: Organized controllers, models, and routes
- **Middleware Chain**: Authentication, file upload, and socket middleware
- **Real-Time Events**: Socket.io for instant messaging and notifications
- **Security**: JWT authentication, password hashing, CORS configuration

### Frontend Architecture

- **Component-Based**: Modular React components with TypeScript
- **State Management**: Centralized state with Zustand stores
- **Routing**: Client-side routing with React Router
- **Styling**: Utility-first approach with Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/TuMinhHung0778/SwiftChat_RealtimeChatApplication.git
   cd SwiftChat_RealtimeChatApplication
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:

   ```env
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/swiftchat
   JWT_SECRET=your_jwt_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend**

   ```bash
   cd backend
   npm run dev
   ```

   Server will run on http://localhost:5001

2. **Start the Frontend**

   ```bash
   cd frontend
   npm run dev
   ```

   App will run on http://localhost:5173

3. **Access the Application**
   - Frontend: http://localhost:5173
   - API Documentation: http://localhost:5001/api-docs

## 📡 API Documentation

The API is fully documented using Swagger. Access the documentation at:

```
http://localhost:5001/api-docs
```

Key endpoints include:

- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/users` - Get user list
- `POST /api/friends/request` - Send friend request
- `GET /api/conversations` - Get user conversations
- `POST /api/messages` - Send message

## 🔧 Development

### Available Scripts

**Backend:**

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

**Frontend:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Environment Variables

Configure the following environment variables:

**Backend (.env):**

- `PORT` - Server port (default: 5001)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT access tokens
- `REFRESH_TOKEN_SECRET` - Secret for JWT refresh tokens
- `CLOUDINARY_*` - Cloudinary configuration for file uploads

## 🧪 Testing

(Add testing instructions if implemented)

## 🚢 Deployment

### Backend Deployment

1. Set production environment variables
2. Run `npm start`
3. Ensure MongoDB is accessible
4. Configure reverse proxy (nginx) for production

### Frontend Deployment

1. Run `npm run build`
2. Serve the `dist` folder with a static server
3. Configure API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Tu Minh Hung**

- GitHub: [@TuMinhHung0778](https://github.com/TuMinhHung0778)
- LinkedIn: [Your LinkedIn Profile]

## 🙏 Acknowledgments

- Socket.io for real-time communication
- MongoDB for flexible data storage
- React ecosystem for modern frontend development
- Tailwind CSS for rapid UI development

---

⭐ If you found this project helpful, please give it a star!
