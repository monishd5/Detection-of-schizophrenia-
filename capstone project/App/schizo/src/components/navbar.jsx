import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <img src={logo} alt="Logo" style={styles.logoImage} />
      </div>
      <div style={styles.navButtons}>
        <Link to="/home" style={styles.navButton}>Home</Link>
        <Link to="/about" style={styles.navButton}>About</Link>
        <Link to="/contact" style={styles.navButton}>Contact</Link>
        <Link to="/profile" style={styles.navButton}>Profile</Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#7ab2d3',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    width: '100px',
  },
  navButtons: {
    display: 'flex',
    gap: '10px',
  },
  navButton: {
    padding: '8px 12px',
    color: '#233',
    backgroundColor: '#e9f7f5',
    textDecoration: 'none',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
};

export default Navbar;
