import axios from "axios";

// Базовый адрес Flask API вынесен отдельно, чтобы не дублировать URL в страницах.
export const API_URL = "http://127.0.0.1:5000/api";

// Общий HTTP-клиент для запросов меню, заказов и других серверных данных.
export const apiClient = axios.create({
  baseURL: API_URL,
});
