import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { get as _get } from 'lodash';
import './style.scss';

const Nav = () => (
  <nav>
    <div className="nav__item">
      <a href="#top">Yun Li</a>
    </div>
    <div className="nav__item nav__item--about">
      <a href="#about">About</a>
    </div>
    <div className="nav__item nav__item--index">
      <a href="#index">Index</a>
    </div>
  </nav>
);

// Nav.propTypes = {
//   name: PropTypes.string,
// };
//
// Nav.defaultProps = {
//   name: '',
// };

// function mapStateToProps(state) {
//   const entities = _get(state, 'entities');
//   const name = _get(entities, 'me.name');
//
//   return {
//     name,
//   };
// }

export default Nav;
// export default connect(mapStateToProps, null)(Nav);
