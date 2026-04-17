import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'

import HomePage from './landing_page/home/HomePage'
import AboutPage from './landing_page/about/AboutPage';
import PricingPage from './landing_page/pricing/PricingPage';
import ProductsPage from './landing_page/products/ProductPage';
import SingUp from './landing_page/singup/SingUp';
import Support from './landing_page/support/Support';
import PageNotFound from './landing_page/PageNotFound';
import Navbar from './landing_page/Navbar'
import Footer from './landing_page/Footer'
import Login from './landing_page/singup/Login';

import Dashboard from '../../dashboard/src/components/Dashboard';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* 1. Navbar is inside Router (so Links work) but outside Routes */}
      <Navbar />

      {/* 2. Routes container only holds Route items */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/support" element={<Support />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* 3. Footer is outside Routes */}
      <Footer />
    </BrowserRouter>
  </StrictMode>
)