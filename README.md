# Chat App

Chat application dengan React Native (Expo) dan Node.js Express.

## Fitur
- ✅ Autentikasi Username-Password
- ✅ Auto-login
- ✅ Chat History Offline
- ✅ Upload Gambar
- ✅ Real-time Chat

## Struktur Folder

```
chat-app/
├── backend/          - Node.js Express API
├── frontend/         - React Native Expo
├── README.md
└── .gitignore
```

## Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend berjalan di `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npx expo start
```

Tekan **w** untuk web atau **a/i** untuk Android/iOS.

## Default Test Accounts

```
Username: admin
Password: admin123

Username: testuser
Password: password123

Username: john
Password: john123
```

## Teknologi

- **Frontend**: React Native, Expo, Axios
- **Backend**: Express.js, TypeScript, JWT, Bcrypt
- **Storage**: JSON File

## Author

Muhammad Syauqi Satrio Wibowo - 24060123120021 - PBP D
