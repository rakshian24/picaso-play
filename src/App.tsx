import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.WELCOME} element={<Welcome />} />
    </Routes>
  );
}

export default App;
