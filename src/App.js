import Main from "./pages/Main/Main";
import Album from "./pages/Album/Album";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./core/core.css";

function App() {
  console.log("테스트 볼게요");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/album" element={<Album />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
