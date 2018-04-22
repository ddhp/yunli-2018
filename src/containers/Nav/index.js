import React from 'react';
import classNames from 'classnames';
import animateScrollTo from 'animated-scroll-to';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { get as _get } from 'lodash';
import './style.scss';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentActive: undefined,
    };

    this.onScroll = this.onScroll.bind(this);
    this.checkScrollTop = this.checkScrollTop.bind(this);
    this.onAClick = this.onAClick.bind(this);
    this.tick = false;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
  }

  onAClick(e) {
    e.preventDefault();
    const target = e.currentTarget.getAttribute('data-target');
    this.setState();
    window.history.pushState(null, null, `#${target}`);
    const targetDOM = document.querySelector(`#${target}`);
    animateScrollTo(targetDOM);
  }

  onScroll() {
    if (!this.tick) {
      this.tick = true;
      requestAnimationFrame(this.checkScrollTop);
    }
  }

  checkScrollTop() {
    let nextActive;
    const { currentActive } = this.state;
    this.tick = false;
    const sectionAboutOffsetTop = document.querySelector('section.about').offsetTop;
    const sectionIndexOffsetTop = document.querySelector('section.section--index').offsetTop;
    const windowScrollY = window.scrollY;
    if (windowScrollY >= sectionAboutOffsetTop - 10) {
      nextActive = 'about';
    } else if (windowScrollY >= sectionIndexOffsetTop) {
      nextActive = 'index';
    } else {
      nextActive = undefined;
    }
    if (currentActive !== nextActive) {
      this.setState({
        currentActive: nextActive,
      });
    }
  }

  render() {
    const { currentActive } = this.state;

    return (
      <nav>
        <div className="nav__item">
          <a
            href="#top"
            onClick={this.onAClick}
            data-target="intro"
          >
            Yun Li
          </a>
        </div>
        <div
          className={classNames('nav__item nav__item--about', {
            active: currentActive === 'about',
          })}
        >
          <a
            href="#about"
            onClick={this.onAClick}
            data-target="about"
          >
            About
          </a>
        </div>
        <div
          className={classNames('nav__item nav__item--index', {
            active: currentActive === 'index',
          })}
        >
          <a
            href="#index"
            onClick={this.onAClick}
            data-target="index"
          >
            Index
          </a>
        </div>
      </nav>
    );
  }
}

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
