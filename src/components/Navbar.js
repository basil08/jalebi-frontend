import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg ${isSticky ? 'navbar-light bg-light fixed-top' : 'navbar-dark'}`}>
      <div className="container">
        <a className="navbar-brand" href="/">Jalebi</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="/profile">Profile</a></li>
            {/* <li className="nav-item"><a className="nav-link" href="#services">Services</a></li> */}
            {/* <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
