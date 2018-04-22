import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { get as _get, debounce as _debounce } from 'lodash';
// import { get as _get } from 'lodash';
import stdout from '../../../stdout';
import './style.scss';

const debug = stdout('container/Home/IndexSection');

export class IndexSection extends React.Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    images: [],
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.onResize = _debounce(this.onResize.bind(this), 250);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentDidMount(/* nextProps, prevState */) {
    if (typeof window !== 'undefined') {
      this.onResize();
      window.addEventListener('resize', this.onResize);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }
  }

  onResize() {
    debug(this.props.images, document.body.offsetWidth);
    this.setState({
      isBelow768: document.body.offsetWidth <= 768,
    });
  }

  onMouseEnter(e) {
    this.setState({
      hoveredProjectId: e.currentTarget.getAttribute('data-key'),
    });
  }

  onMouseLeave() {
    this.setState({
      hoveredProjectId: null,
    });
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    // this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    debug(error, info, this);
  }

  render() {
    const { images } = this.props;
    const { isBelow768, hoveredProjectId } = this.state;
    debug(images);
    const dup = images.slice();

    if (!isBelow768) {
      dup.unshift({
        id: 'dummy1',
      });

      dup.unshift({
        id: 'dummy2',
      });
    }

    return (
      <section className="section--index" id="index">
        {isBelow768 &&
          <p className="mobile-title">Index</p>
        }

        {dup.map((i) => {
          const c = classNames('index-img', {
            'same-project-hovered': hoveredProjectId === i.projectId,
            disabled: !i.filename,
          });
          return (
            <a
              className={c}
              href={`#${i.projectName}`}
              key={i.id}
              data-key={i.projectId}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
            >
              {i.filename &&
                <img
                  src={`${i.prepend}${i.filename}`}
                  alt={i.filename}
                />
              }
              {i.filename &&
                <div className="project-name">
                  {i.projectName}
                </div>
              }
            </a>
          );
        })}
      </section>
    );
  }
}

export function mapStateToProps(state) {
  const imageEntity = _get(state, 'entities.image');
  const keys = Object.keys(imageEntity);
  const images = keys.map(k => imageEntity[k]);

  return {
    images,
  };
}


export default connect(mapStateToProps, null)(IndexSection);
