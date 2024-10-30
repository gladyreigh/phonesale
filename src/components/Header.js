import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/phonesalelogo.png';
import '../App.css';


function Header({ cart }) {
  return (
    <header>
      <div className="logo-header">
        <img src={logo} alt="PhoneSale Logo" className="logo" />
      </div>
      <hr className="header-line" />
      <nav>
        <ul id="nav-links" className="nav-links">
          <li><Link to="/" id="home-link">Home</Link></li>
          <li><Link to="/" id="products-link">Products</Link></li>
          <li><Link to="/cart" id="cart-link">Cart <span id="cart-count" className={`cart-count ${cart.length === 0 ? 'empty' : ''}`}>{cart.length}</span></Link></li>
          <li><Link to="/about/" id="about">About</Link></li>
          <li><Link to="/repair/" id="repair">Repair</Link></li>
          <li><Link to="/contact/" id="contact">Contact</Link></li>
          <li><a href="https://greyshop.pages.dev/" id="Policy">Policy</a></li>

          <li className="close-icon"><i className="fas fa-times" onClick={closeMenu}></i></li>
        </ul>
        <div className="header-quote">
          <p>"We provide you with the finest gadgets that you deserve, at reasonable prices."</p>
        </div>
        <i className="fas fa-bars hamburger" onClick={openMenu}>
          <span id="cart-count-hamburger" className={`cart-count-hamburger ${cart.length === 0 ? 'empty' : ''}`}>{cart.length}</span>
        </i>
      </nav>
    </header>
  );
}

function openMenu() {
  document.getElementById('nav-links').style.right = '0';
  document.querySelector('.close-icon').style.display = 'block';
  document.querySelector('.fas.fa-bars.hamburger').style.display = 'none';
}

function closeMenu() {
  document.getElementById('nav-links').style.right = '-200px';
  document.querySelector('.close-icon').style.display = 'none';
  document.querySelector('.fas.fa-bars.hamburger').style.display = 'block';
}

export default Header;
