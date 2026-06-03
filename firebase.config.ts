import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Конфигурация Firebase из проекта ресторана: используется для Auth на фронтенде.
const firebaseConfig = {
  apiKey: "AIzaSyBwo26sg0pL68MSopX6YiT7W1X7HKi-m24",
  authDomain: "restaurant-app-c45d8.firebaseapp.com",
  projectId: "restaurant-app-c45d8",
  storageBucket: "restaurant-app-c45d8.firebasestorage.app",
  messagingSenderId: "225397340408",
  appId: "1:225397340408:web:379b056ff1139ea6d7e30d",
  measurementId: "G-L3YCLGF6GQ"
};

// Экспортируем auth, чтобы хук useAuth мог выполнять вход, регистрацию и выход.
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
