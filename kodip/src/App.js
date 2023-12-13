import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Nopage from "./pages/Nopage";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
