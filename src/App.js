import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateStudySet from "./pages/CreateStudySet";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  const initialCardData = []

  for(let i = 0; i < 100; i++) {
    initialCardData.push({ term: "term", definition: "definition" })
  }

  const [isAuth, setIsAuth] = useState(false);

  // bad solution but should work for now: initialize with a bunch of card objects
  const [cardData, setCardData] = useState(initialCardData);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route
          path="/create"
          element={<CreateStudySet cardData={cardData} setCardData={setCardData} isAuth={isAuth}/>}
        />
      </Routes>
    </Router>
  );
};

export default App;
