import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get as _get, debounce as _debounce } from 'lodash';
import NavComponent from '../Nav';
import ProjectItem from './ProjectItem';
import IndexSectionComponent from './IndexSection';
// import action from '../../actions';
import stdout from '../../stdout';
import './style.scss';

const debug = stdout('container/Home');

export class Home extends React.Component {
  static propTypes = {
    author: PropTypes.object,
    projects: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    author: {},
    projects: [],
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.onResize = _debounce(this.onResize.bind(this), 250);
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
    debug(document.body.offsetWidth);
    this.setState({
      isBelow768: document.body.offsetWidth <= 768,
    });
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    // this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    debug(error, info, this);
  }

  render() {
    debug('render method');
    const { projects, author } = this.props;
    const { isBelow768 } = this.state;

    return (
      <div className="page--home">
        <NavComponent />

        <section className="intro">
          {author.intro}
        </section>

        {isBelow768 &&
          <section className="contact">
            <div className="email">
              {author.email}
            </div>
            <div className="phone">
              {author.phone}
            </div>
          </section>
        }

        <section className="list--projects">
          {projects.map(p => <ProjectItem project={p} key={p.id} />)}
        </section>

        <IndexSectionComponent />

        <section className="about" id="about">
          {isBelow768 &&
            <p className="mobile-title">About</p>
          }
          {author.about}
        </section>

        {!isBelow768 &&
          <section className="contact">
            <div className="email">
              {author.email}
            </div>
            <div className="phone">
              {author.phone}
            </div>
          </section>
        }

        <section
          className="designby"
          dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
            __html: author.designby,
          }}
        />

      </div>
    );
  }
}

export function mapStateToProps(state) {
  const projectEntity = _get(state, 'entities.project');
  const imageEntity = _get(state, 'entities.image');
  const author = _get(state, 'entities.author');
  debug(imageEntity);
  const projectIds = _get(state, 'pages.home.projects');
  const projects = projectIds.map((id) => {
    const project = projectEntity[id];
    if (!project) return {};
    project.images = project.images.map(iId => imageEntity[iId] || {});
    return project;
  });
  debug(projects);

  return {
    projects,
    author: author['1'],
  };
}

export function mapDispatchToProps(/* dispatch */) {
  return {
    // dummyAction: () => dispatch(action.dummyAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
