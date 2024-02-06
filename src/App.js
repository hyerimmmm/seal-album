import Main from "./pages/Main/Main";
import Album from "./pages/Album/Album";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./core/core.css";

function App() {
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
