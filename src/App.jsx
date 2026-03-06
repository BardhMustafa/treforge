import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useScrollY } from "./hooks";
import { GridBackground } from "./components/ui/GridBackground";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { ClientDetailPage } from "./pages/ClientDetailPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";

export default function App() {
  const scrollY = useScrollY();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
        body { background: #05080e; color: #fff; overflow-x: hidden; min-width: 280px; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #05080e; }
        ::-webkit-scrollbar-thumb { background: rgba(0,255,180,0.3); border-radius: 2px; }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        ::placeholder { color: rgba(255,255,255,0.2); }
        input, textarea { color-scheme: dark; }
        @media (max-width: 480px) {
          button { min-height: 44px; }
        }
      `}</style>

      <BrowserRouter>
        <ScrollToTop />
        <GridBackground />
        <Navbar scrollY={scrollY} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clients/:slug" element={<ClientDetailPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
