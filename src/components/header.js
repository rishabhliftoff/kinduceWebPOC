import React from 'react';

const Header = (props) => {
  return (
    <div className="header__container">
      {props.children}
      <div style={{clear: 'both'}}></div>
    </div>
  )
}

export default Header;
