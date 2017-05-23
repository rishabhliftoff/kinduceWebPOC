import React from 'react';

const Header = props =>
   (
     <div className="header__container">
       {props.children}
       <div style={{ clear: 'both' }} />
     </div>
  )
;

export default Header;
