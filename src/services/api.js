import axios from "axios";   // Because Axios helps React talk to backend APIs.

// You are creating your own Axios instance named api.
// Why we do this?
// Normally you write:
// axios.get("http://localhost:8080/users")
// axios.post("http://localhost:8080/auth/login")
// Again and again ❌

// Now with baseURL:
// api.get("/users")
// api.post("/auth/login")
// Cleaner ✅
// Shorter ✅
// Reusable ✅
// 📌 Think of it like setting a default backend URL.

const api = axios.create({
    baseURL: "https://url-shortner-pj51.onrender.com"
});


// 🔹 Meaning
// Before every request goes to backend, this function will run.
// 📌 This is called a request interceptor.
// Real-life meaning:
// “Wait! Before sending the request — let me attach the token.”

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if(token) {
            config.headers.Authorization = `Bearer ${token}`; // It adds this header to request:   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
        }  // 🔹 Why we need this?  Your Spring Boot JWT filter checks this header: Authorization: Bearer <token>

        return config; // After modifying the request → send it to backend.
    },
    (error) => {
        return Promise.reject(error);
    }
);

// If backend says token invalid → auto logout.
// 👉 “Whenever ANY API gives a response — run this code first.”
// So it works for:
// ✔ success response
// ✔ error response
// globally 🌍
api.interceptors.response.use(
    (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/login"; // But interceptor is outside React → so window.location is used ✅ instead of navigate("/login")
            }
            return Promise.reject(error); // 🗣️ “I am not handling this error here. Send this error back to the place where the API was called.” So your component’s catch block works ✅
        }
);

export default api;

// interceptor - This runs BEFORE every request.
// It: 
// -> Gets token from localStorage
// -> Adds Authorization header automatically
// Now you never manually attach token.
// Professional approach.

// 🧠 Engineer Lesson
// Frontend does:
// UI control
// Basic session handling
// Backend does:
// Real security validation
// Never trust frontend fully.

// 🔥 Real Engineering Approach
// We combine TWO checks:
// 1️⃣ Frontend Quick Check (Optional)
// If no token → redirect to login
// If expired → remove token → redirect
// 2️⃣ Backend Final Authority (Mandatory)
// Every request goes to backend
// Backend validates token
// If invalid → return 401
// Frontend must handle 401 globally.



// ✅ 1️⃣ Where should we store token?
// For your project → localStorage is fine.
// “For production, HttpOnly cookies are safer.”

// ✅ 2️⃣ What happens if user refreshes page?
// fields become empty and React state resets
// 👉 Does login session disappear?
// ❌ No — if token is stored in localStorage.
// Because:
// -> localStorage survives refresh
// -> React state resets
// -> But token still exists in browser storage
// -> So what should we do on refresh?
// We should:
// -> Check if token exists
// -> Automatically consider user logged in

// ✅ 3️⃣ How do we automatically send token in future requests?
// We don’t manually add token every time.
// We use: 🔥 Axios Interceptor

// Question :- If user logs in and token is added to localStorage, will App automatically re-render?
// ❌ No.
// Why?
// Because:
// const token = localStorage.getItem("token");
// localStorage is NOT React state.
// React only re-renders when:
// state changes
// props change
// Changing localStorage does NOT trigger re-render.
// This is a very important concept.
// 🧠 So What Is Missing?
// We need:
// 👉 Authentication State
// Instead of:
// const token = localStorage.getItem("token");
// We should manage:
// const [isAuthenticated, setIsAuthenticated] = useState(false);
// Or even better:
// Use Context API (but later).