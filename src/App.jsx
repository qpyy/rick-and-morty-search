import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import CharacterDetail from "./pages/CharacterDetail";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/characters/:id" element={<CharacterDetail />} />
        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    </main>
  );
};

export default App;
