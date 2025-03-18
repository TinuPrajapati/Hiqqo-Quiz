<<<<<<< HEAD
import "./App.css";
import "animate.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/LandingPage/Landing";
import JoinPage from "./pages/Join";
import QuizPage from "./pages/QuizPage";
import AdminPage from "./pages/QuizCreate";

function App() {
=======
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/LandingPage/Landing";

function App() {
  const [count, setCount] = useState(0);

>>>>>>> a43fa47b10bedaa6da57211b7acd47ee71be4387
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
<<<<<<< HEAD
        <Route path="/join" element={<JoinPage />} />
        <Route path="/quizpage" element={<QuizPage />} />
        <Route path="/createQuiz" element={<AdminPage />} />
      </Routes>

      <footer className="bg-[rgb(8,25,72)] text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 QuizMaster. All rights reserved.</p>
        </div>
      </footer>
=======
      </Routes>
>>>>>>> a43fa47b10bedaa6da57211b7acd47ee71be4387
    </BrowserRouter>
  );
}

export default App;
