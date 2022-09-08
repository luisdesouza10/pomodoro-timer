import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layouts";
import { History, Home } from "./pages";
export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/History" element={<History />} />
      </Route>
    </Routes>
  );
}
