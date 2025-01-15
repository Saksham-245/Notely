# Notely

A mobile note-taking application built with Expo and React Native that allows users to create, manage, and organize their notes on the go.

## Features

- 📝 Create and manage personal notes
- 🔐 Secure user authentication
- 👤 User profile management
- 📱 Native mobile experience
- 🎨 Modern and intuitive user interface
- 📊 Bottom sheet interactions
- 🔄 Context-based state management

## Tech Stack

- [Expo](https://expo.dev/) - React Native development framework
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- React Native - Mobile app development
- Custom Authentication System
- Context API for state management

## Getting Started

1. Clone the repository
2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npx expo start
```

4. Use the Expo Go app on your mobile device to scan the QR code, or run in a simulator

## Project Structure

```
notely/
├── app/
│   ├── (auth)/
│   │   ├── _layout.jsx       # Authentication layout wrapper
│   │   └── home.jsx          # Home screen
│   └── login/
│       └── index.jsx         # Login screen
├── src/
│   ├── api/
│   │   └── http.js          # HTTP client configuration
│   ├── components/
│   │   └── ...              # Reusable React components
│   ├── context/
│   │   ├── AuthContext.js   # Authentication state management
│   │   └── BottomSheetContext.js # Bottom sheet state management
│   └── hooks/
│       └── useUserInfo.js   # Custom hook for user information
```

## Key Features

### Authentication
- Secure user authentication system
- Protected routes using auth layout
- User session management

### State Management
- Context-based state management for authentication
- Bottom sheet context for modal interactions
- Custom hooks for user information

## 📝 Documentation

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
