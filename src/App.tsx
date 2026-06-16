import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import GroupPage from "./pages/GroupPage";
import CategoryPage from "./pages/CategoryPage";
import SubcategoryPage from "./pages/SubcategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TrainingPage from "./pages/TrainingPage";
import ShippingPage from "./pages/ShippingPage";
import ReturnsPage from "./pages/ReturnsPage";
import SearchPage from "./pages/SearchPage";
import RequestAQuotePage from "./pages/RequestAQuotePage";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:groupSlug" element={<GroupPage />} />
          <Route path="products/:groupSlug/:categorySlug" element={<CategoryPage />} />
          <Route path="products/:groupSlug/:categorySlug/:subcategorySlug" element={<SubcategoryPage />} />
          <Route path="products/:groupSlug/:categorySlug/:subcategorySlug/:productId" element={<ProductDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="training" element={<TrainingPage />} />
          <Route path="shipping" element={<ShippingPage />} />
          <Route path="returns" element={<ReturnsPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="request-a-quote" element={<RequestAQuotePage />} />
          {/* Catch-all privacy/terms placeholders */}
          <Route path="privacy" element={<PlaceholderPage title="Privacy Policy" />} />
          <Route path="terms" element={<PlaceholderPage title="Terms of Use" />} />
          <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-offwhite)' }}>
      <section className="border-b border-white/10 py-14" style={{ background: 'var(--color-teal)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>{title}</h1>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-zinc-500 text-lg">This page is coming soon. Please check back later.</p>
      </div>
    </div>
  );
}
