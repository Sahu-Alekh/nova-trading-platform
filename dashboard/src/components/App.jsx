import React from 'react';
import './Appcom.css';

const appsData = [
  {
    name: "Console",
    description: "The central dashboard for your Nova account with in-depth reports and visualizations.",
    icon: "https://Nova.com/static/images/products/console.svg",
    link: "https://console.Nova.com"
  },
  {
    name: "Coin",
    description: "Buy direct mutual funds online, commission-free, delivered directly to your Demat account.",
    icon: "https://Nova.com/static/images/products/coin.svg",
    link: "https://coin.Nova.com"
  },
  {
    name: "Varsity",
    description: "A series of modules on stock market trading and investing for beginners to professionals.",
    icon: "https://Nova.com/static/images/products/varsity.svg",
    link: "https://Nova.com/varsity"
  },
  {
    name: "Sensibull",
    description: "Options trading platform that lets you create strategies based on your market view.",
    icon: "https://sensibull.com/favicon.ico",
    link: "https://sensibull.com"
  }
];

const AppCard = ({ app }) => (
  <div className="col-md-6 col-lg-3 mb-4">
    <div className="card h-100 kite-card border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <div className="icon-wrapper me-3">
            <img 
              src={app.icon} 
              alt={app.name} 
              className="img-fluid"
              style={{ width: '40px', height: '40px' }}
            />
          </div>
          <h3 className="card-title h5 mb-0 fw-bold">{app.name}</h3>
        </div>
        <p className="card-description text-secondary mb-3">{app.description}</p>
        <a 
          href={app.link} 
          className="card-link text-decoration-none fw-medium"
          target="_blank" 
          rel="noreferrer"
        >
          Open {app.name} <span className="arrow">→</span>
        </a>
      </div>
    </div>
  </div>
);

const Apps = () => {
  return (
    <main className="kite-universe py-5">
      <div className="container">
        <header className="page-header text-center mb-5">
          <h1 className="display-5 fw-bold mb-3">The Nova Universe</h1>
          <p className="lead text-secondary">Extend your trading experience with our ecosystem apps.</p>
        </header>

        <section className="apps-grid">
          <div className="row g-4">
            {appsData.map((app, index) => (
              <AppCard key={index} app={app} />
            ))}
          </div>
        </section>
        
        <footer className="page-footer text-center mt-5 pt-4">
          <p className="text-secondary">
            Want to build your own? Check out the 
            <a href="#api" className="text-link ms-1 text-decoration-none fw-medium">Kite Connect API</a>
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Apps;