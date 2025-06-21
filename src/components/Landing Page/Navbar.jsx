import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Causes', path: '/causes' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo-container">
          <span className="logo-text">
            <img 
              src="/Kadam.png" 
              alt="Kadam Logo" 
              className="logo-animate"
            />
          </span>
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.name}
              <span className="nav-link-underline"></span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;