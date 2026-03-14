import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useScrollY } from "./hooks";
import { GridBackground } from "./components/ui/GridBackground";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { ClientDetailPage } from "./pages/ClientDetailPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { BlogListPage } from "./pages/blog/BlogListPage";
import { BlogPostPage } from "./pages/blog/BlogPostPage";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminCreatePage } from "./pages/admin/AdminCreatePage";
import { AdminEditPage } from "./pages/admin/AdminEditPage";
import { AdminOffersPage } from "./pages/admin/AdminOffersPage";
import { AdminCreateOfferPage } from "./pages/admin/AdminCreateOfferPage";
import { AdminOfferFeedbackPage } from "./pages/admin/AdminOfferFeedbackPage";
import { AdminSourcesPage } from "./pages/admin/AdminSourcesPage";
import { AdminAgentRunsPage } from "./pages/admin/AdminAgentRunsPage";
import { AdminDraftsPage } from "./pages/admin/AdminDraftsPage";
import { OfferPage } from "./pages/OfferPage";
import { BriefModalProvider } from "./context/BriefModalContext";
import { BriefModal } from "./components/brief/BriefModal";

function AppInner() {
  const scrollY = useScrollY();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <BriefModalProvider>
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

      <ScrollToTop />
      <GridBackground />
      {!isAdmin && <Navbar scrollY={scrollY} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clients/:slug" element={<ClientDetailPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/offer/:token" element={<OfferPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="posts/new" element={<AdminCreatePage />} />
          <Route path="posts/:id/edit" element={<AdminEditPage />} />
          <Route path="offers" element={<AdminOffersPage />} />
          <Route path="offers/new" element={<AdminCreateOfferPage />} />
          <Route path="offers/:id/feedback" element={<AdminOfferFeedbackPage />} />
          <Route path="sources" element={<AdminSourcesPage />} />
          <Route path="agent-runs" element={<AdminAgentRunsPage />} />
          <Route path="drafts" element={<AdminDraftsPage />} />
        </Route>
      </Routes>
      {!isAdmin && <Footer />}
      <BriefModal />
    </BriefModalProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
