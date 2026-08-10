import { Routes, Route } from "react-router-dom";
import { FrontPage } from "./FrontPage";
import { LineView } from "./LineView";

import { ScrollToTop } from "./ScrollToTop";
import { PerfumeDetail } from "./PerfumeDetail";

export const App = () => {

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<FrontPage />} />

        <Route path="/corporalView" element={<LineView />} />
        <Route path="/homeView" element={<LineView />} />
        <Route path="/textilesView" element={<LineView />} />
        <Route path="/automotiveView" element={<LineView />} />
        <Route path="/perfumeDetail" element={<PerfumeDetail />} />
      </Routes>
    </>
  );
};