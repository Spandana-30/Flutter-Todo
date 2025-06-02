# Flutter Todo App with Node.js Backend

A full-stack todo management application built with Flutter frontend and Node.js backend, featuring user authentication, JWT tokens, and CRUD operations for todo items.

## 🚀 Features

- **User Authentication**: Registration and login with email/password
- **JWT Token Security**: Secure authentication using JSON Web Tokens
- **Todo Management**: Create, read, and delete todo items
- **Responsive Design**: Modern UI with blue gradient theme
- **Real-time Updates**: Dynamic task count and instant UI updates
- **Cross-platform**: Web support with mobile-friendly design
- **Swipe Gestures**: Intuitive swipe-to-delete functionality

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Flutter SDK** (v3.7.0 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

## 🛠️ Project Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd todo-flutter
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd Backend/Backend
npm install
```

#### Backend Dependencies
- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT token generation and verification
- **cors**: Cross-origin resource sharing
- **body-parser**: Parse incoming request bodies
- **nodemon**: Development server with auto-restart

#### Start MongoDB
Make sure MongoDB is running on your system:
- **Windows**: Start MongoDB service or run `mongod`
- **macOS**: `brew services start mongodb-community`
- **Linux**: `sudo systemctl start mongod`

#### Start Backend Server
```bash
npm run dev
```
The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend/frontend
flutter pub get
```

#### Frontend Dependencies
- **flutter**: UI framework
- **http**: HTTP client for API calls
- **jwt_decoder**: JWT token decoding
- **shared_preferences**: Local storage for tokens
- **velocity_x**: UI utilities and extensions
- **flutter_slidable**: Swipe gesture functionality

#### Run Flutter App
```bash
flutter run -d chrome --web-port=9000
```
The frontend will be available at `http://localhost:9000`

## 🏗️ Project Structure

```
todo-flutter/
├── Backend/Backend/               # Node.js Backend
│   ├── app.js                    # Express app configuration
│   ├── index.js                  # Server entry point
│   ├── package.json              # Backend dependencies
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── controller/               # Business logic controllers
│   │   ├── todo.controller.js
│   │   └── user.controller.js
│   ├── model/                    # MongoDB schemas
│   │   ├── todo.model.js
│   │   └── user.model.js
│   ├── routes/                   # API route definitions
│   │   ├── todo.routes.js
│   │   └── user.route.js
│   └── services/                 # Service layer
│       ├── todo.services.js
│       └── user.services.js
└── frontend/frontend/             # Flutter Frontend
    ├── lib/
    │   ├── main.dart             # App entry point
    │   ├── config.dart           # API configuration
    │   ├── loginPage.dart        # Login screen
    │   ├── registration.dart     # Registration screen
    │   ├── dashboard.dart        # Main todo dashboard
    │   └── applogo.dart          # App logo component
    ├── pubspec.yaml              # Flutter dependencies
    └── web/                      # Web-specific files
```

## 🔧 State Management Approach

### **Chosen Approach: StatefulWidget with setState()**

**Why this approach was selected:**

1. **Simplicity**: For a todo app with relatively simple state requirements, StatefulWidget provides a straightforward solution without additional complexity.

2. **Learning Curve**: Minimal learning curve, making the app accessible to developers at all levels.

3. **Direct State Control**: Each screen manages its own state directly, making the data flow easy to understand and debug.

4. **Performance**: For this scale of application, setState() provides adequate performance without the overhead of more complex state management solutions.

### **State Management Implementation:**

- **Authentication State**: JWT tokens stored in SharedPreferences for persistence
- **Todo State**: Local state in Dashboard widget with API synchronization
- **UI State**: Loading states, form validation, and user feedback managed locally
- **Navigation State**: Flutter's built-in Navigator for route management

### **Alternative Approaches Considered:**

- **Provider**: Would be suitable for scaling but adds complexity
- **Riverpod**: Modern but unnecessary for current scope
- **BLoC**: Powerful but overkill for this application size

## 🧭 Navigation Structure

### **Navigation Architecture**

The app uses **imperative navigation** with Flutter's built-in Navigator:

```dart
// Navigation flow
LoginPage → Registration (if needed) → Dashboard
```

### **Route Management:**

1. **Initial Route**: `LoginPage` (main.dart)
2. **Registration Flow**: Push to Registration from Login
3. **Authenticated Flow**: Push to Dashboard after successful login
4. **Token Validation**: JWT token checked on app startup

### **Navigation Implementation:**

```dart
// Login to Dashboard
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => Dashboard(token: myToken)),
);

// Login to Registration
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => Registration()),
);
```

### **Why This Approach:**
- **Simplicity**: Clear, linear navigation flow
- **Token Passing**: Easy to pass JWT tokens between screens
- **Back Navigation**: Natural back button behavior
- **No Complex Routing**: No need for named routes or complex routing logic

## 🎨 UI/UX Design

### **Design System:**
- **Color Scheme**: Blue gradient theme (`#1E88E5` to `#0D47A1`)
- **Typography**: Material Design typography scale
- **Components**: Material Design components with custom styling
- **Responsive**: Adapts to different screen sizes

### **Key UI Features:**
- **Gradient Backgrounds**: Consistent blue theme across all screens
- **Material Cards**: Clean card design for todo items
- **Floating Action Button**: Quick access to add todos
- **Swipe Gestures**: Intuitive swipe-to-delete functionality
- **Loading States**: User feedback during API calls

## 🔌 API Endpoints

### **Authentication Endpoints:**
- `POST /registration` - User registration
- `POST /login` - User login

### **Todo Endpoints:**
- `POST /storeTodo` - Create new todo
- `POST /getUserTodoList` - Get user's todos
- `POST /deleteTodo` - Delete todo by ID

### **API Configuration:**
```dart
// Frontend API base URL
const String baseURL = "http://localhost:5000";
```

## 🚧 Challenges Faced and Solutions

### **1. CORS Issues**
**Challenge**: Flutter web app couldn't communicate with Node.js backend due to CORS restrictions.

**Solution**: 
- Added CORS middleware to Express.js backend
- Configured proper headers for cross-origin requests
```javascript
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### **2. Import Path Mismatches**
**Challenge**: Backend had inconsistent import paths causing module resolution errors.

**Solution**:
- Standardized all import paths to match actual file names
- Fixed controller imports in routes
- Aligned service imports in controllers
- Updated model imports in services

### **3. API Route Alignment**
**Challenge**: Frontend API calls didn't match backend route definitions.

**Solution**:
- Updated backend routes to match frontend expectations
- Changed `/register` to `/registration`
- Updated `/createToDo` to `/storeTodo`
- Modified HTTP methods to match frontend calls

### **4. JWT Token Handling**
**Challenge**: Proper JWT token storage and validation across app sessions.

**Solution**:
- Used SharedPreferences for persistent token storage
- Implemented JWT decoding to extract user ID
- Added token validation on protected routes

### **5. State Synchronization**
**Challenge**: UI not updating after todo operations.

**Solution**:
- Implemented proper setState() calls after API operations
- Added loading states for better user experience
- Ensured API calls complete before UI updates

### **6. Package Version Conflicts**
**Challenge**: Flutter dependencies had version conflicts and duplicate entries.

**Solution**:
- Fixed pubspec.yaml structure
- Resolved Dart SDK version compatibility
- Added proper version constraints for all packages

### **7. Database Field Mapping**
**Challenge**: Frontend expected 'desc' but backend returned 'description'.

**Solution**:
- Updated frontend to use 'description' field consistently
- Modified ListTile subtitle to use correct field name

## 🧪 Testing

### **Backend Testing:**
```bash
# Test registration
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"testpass"}' \
http://localhost:5000/registration

# Test login
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"testpass"}' \
http://localhost:5000/login
```

### **Frontend Testing:**
- Manual testing through UI
- Hot reload for rapid development
- Flutter DevTools for debugging

## 🚀 Deployment Considerations

### **Backend Deployment:**
- Environment variables for MongoDB URI
- JWT secret management
- CORS configuration for production domain
- Process management (PM2)

### **Frontend Deployment:**
- Build for web: `flutter build web`
- Configure API base URL for production
- Serve static files with web server

## 📝 Future Enhancements

- [ ] **Edit Todo Functionality**: Allow users to modify existing todos
- [ ] **Todo Categories**: Organize todos by categories or tags
- [ ] **Due Dates**: Add date/time functionality for todos
- [ ] **Search and Filter**: Find specific todos quickly
- [ ] **Offline Support**: Cache todos for offline usage
- [ ] **Push Notifications**: Remind users of pending todos
- [ ] **Dark Mode**: Theme switching capability
- [ ] **Advanced State Management**: Migrate to Provider or Riverpod for scaling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Developer**: Your Name
- **Project**: Flutter Todo App with Node.js Backend

---

**Happy Coding! 🎉**

