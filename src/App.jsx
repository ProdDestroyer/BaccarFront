import { Routes, Route } from "react-router-dom";

import { FrontPage } from "./FrontPage";
import { BodilyLineView } from "./BodilyLineView";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/corporalView" element={<BodilyLineView />} />
    </Routes>
  )
}
