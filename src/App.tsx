import { BrowserRouter } from "react-router-dom";
import { CyclesContextProvider } from "./contexts/CyclesContext";
import { Router } from "./Router";

export function App() {
  return (
    <BrowserRouter>
      <CyclesContextProvider>
        <Router />
      </CyclesContextProvider>
    </BrowserRouter>
  );
}
