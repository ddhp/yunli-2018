import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { get as _get, debounce as _debounce } from 'lodash';
import animateScrollTo from 'animated-scroll-to';
// import { get as _get } from 'lodash';
import stdout from '../../../stdout';
import './style.scss';

const debug = stdout('container/Home/IndexSection');

export class IndexSection extends React.Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
    isOnStage: PropTypes.bool.isRequired,
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
    this.onAClick = this.onAClick.bind(this);
  }

  componentDidMount(/* nextProps, prevState */) {
    if (typeof window !== 'undefined') {
      this.onResize();
      window.addEventListener('resize', this.onResize);
    }
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    // this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    debug(error, info, this);
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }
  }

  onResize() {
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

  onAClick(e) {
    e.preventDefault();
    const target = e.currentTarget.getAttribute('data-target');
    this.setState();
    window.history.pushState(null, null, `#${target}`);
    const targetDOM = document.querySelector(`#${target}`);
    animateScrollTo(targetDOM);
  }

  render() {
    const { images, isOnStage } = this.props;
    const { isBelow768, hoveredProjectId } = this.state;
    const dup = images.slice();

    if (!isBelow768) {
      dup.unshift({
        id: 'dummy1',
        projectName: '',
      });

      dup.unshift({
        id: 'dummy2',
        projectName: '',
      });
    }

    return (
      <section
        className={classNames('section--index', {
          'on-stage': isOnStage,
        })}
        id="index"
      >
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
              onClick={this.onAClick}
              data-target={i.projectName.replace(/ /g, '')}
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
  const projectEntity = _get(state, 'entities.project');
  const keys = Object.keys(imageEntity);
  const images = keys.map(k => imageEntity[k]).sort((a, b) => {
    const aIndex = projectEntity[a.projectId].orderIndex;
    const bIndex = projectEntity[b.projectId].orderIndex;
    if (aIndex < bIndex) return -1;
    else if (aIndex === bIndex) return 0;
    return 1;
  });

  return {
    images,
  };
}


export default connect(mapStateToProps, null)(IndexSection);
