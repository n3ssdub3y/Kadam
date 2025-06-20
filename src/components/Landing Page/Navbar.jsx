import { Link } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Causes', path: '/causes' },
    { name: 'Single Cause', path: '/single-cause' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <span className="logo-text">
            <img src="/Kadam.png" alt="Kadam Logo" />
          </span>
        </div>

        <nav className="nav-menu">
          {navItems.map((item, index) => (
            <Link key={index} to={item.path} className="nav-link">
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
