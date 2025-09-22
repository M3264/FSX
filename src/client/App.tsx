import React, {Suspense} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Services = React.lazy(()=> import("./pages/Services"))
const Projects = React.lazy(()=> import("./pages/Projects"))
const Contact = React.lazy(()=> import("./pages/Contact"))
import { OrganizationStructuredData, WebsiteStructuredData } from './components/StructuredData';

// Composant principal de l'App 
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      

     
      <OrganizationStructuredData />
      <WebsiteStructuredData />
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;