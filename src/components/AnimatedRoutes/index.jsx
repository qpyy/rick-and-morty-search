import { Route, Routes, useLocation } from "react-router-dom";
import Main from "../../pages/Main";
import CharacterDetail from "../../pages/CharacterDetail";

import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Main />} />
        <Route path="/characters/:id" element={<CharacterDetail />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
