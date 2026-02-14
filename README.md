# 🎬 CineFlix

CineFlix is a React-based web application for discovering movies using data from The Movie Database (TMDB) API.
It provides a clean and intuitive interface to browse trending and popular movies and to search titles in real time.

The project focuses on clarity, maintainability, and a predictable component-driven architecture.

---

## ✨ Features

* Fetch and display trending movies
* Browse popular movies
* 🔍 Search movies by title
* ⏳ Loading indicators during API calls
* ⚠️ Graceful error handling
* 📱 Responsive layout across screen sizes
* 🔐 Environment-based API configuration

---

## 🛠️ Tech Stack

* ⚛️ React.js
* 🟨 JavaScript (ES6+)
* 🎨 Tailwind CSS
* ⚡ Vite
* 🌐 TMDB API

---

## 📁 Project Structure

```
cineflix/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Search.jsx
│   │   ├── Spinner.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
└── README.md
```

Each component is isolated and reusable, keeping the codebase easy to understand and extend.

---

## 🚀 Setup and Installation

### 📌 Requirements

* Node.js 16+
* npm

### 📥 Clone the Repository

```bash
git clone https://github.com/notsomohit/cineflix-v1.git
cd cineflix-v1
```

### 📦 Install Dependencies

```bash
npm install
```

### 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

Do not expose or commit the API key.

### ▶️ Run the App

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## 🔄 Application Flow

* 🚀 On load, the app fetches trending and popular movies from TMDB
* 🔎 Search queries trigger API requests and update results dynamically
* ⏳ Loading and error states are handled through conditional rendering
* 🧠 UI updates are driven entirely by React state

---

## 🧩 Development Notes

* 📌 API calls are centralized for easier maintenance
* 🧱 Components follow a predictable data flow
* 🎯 Styling uses a utility-first Tailored approach with Tailwind CSS
* ⚙️ Environment variables are managed via Vite

---

## 🛠️ Extending the Project

Possible improvements include:

* Detailed movie pages
* Pagination or infinite scrolling
* User authentication
* Favorites or watchlist
* Backend integration

---

## 🤝 Contributing

Contributions are welcome.

1. 🍴 Fork the repository
2. 🌿 Create a new branch
3. 💾 Commit your changes
4. 🔁 Open a pull request

Keep changes focused and follow existing code patterns.

---

## 📄 License

MIT License
