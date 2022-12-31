import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNavbar from "./components/Navbar";
import CreateStudySet from "./pages/CreateStudySet";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import StudySet from "./pages/StudySet";

const App = () => {
  const initialCardData = [];

  for (let i = 0; i < 100; i++) {
    initialCardData.push({ term: "term", definition: "definition" });
  }

  const [isAuth, setIsAuth] = useState(false);

  // bad solution but should work for now: initialize with a bunch of card objects
  const [cardData, setCardData] = useState(initialCardData);

  return (
    <>
      <Router>
        <MainNavbar isAuth={isAuth} setIsAuth={setIsAuth} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route
            path="/create"
            element={
              <CreateStudySet
                cardData={cardData}
                setCardData={setCardData}
                isAuth={isAuth}
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/buizlets/:id" element={<StudySet />} />
          {/* <Route path="/buizlets/:id/quiz" element={<Quiz />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
