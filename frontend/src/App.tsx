import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants";
import Welcome from "./pages/Welcome";
import Drawing from "./pages/Drawing";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.WELCOME} element={<Welcome />} />
      <Route path={ROUTES.DRAWING_ROOM} element={<Drawing />} />
    </Routes>
  );
}

export default App;
