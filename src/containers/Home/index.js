import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get as _get } from 'lodash';
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

  // componentDidMount() {
  //   this.props.dummyAction();
  // }

  componentDidCatch(error, info) {
    // Display fallback UI
    // this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    debug(error, info, this);
  }

  render() {
    debug('render method');
    const { projects, author } = this.props;

    return (
      <div className="page--home">
        <NavComponent />

        <section className="intro">
          {author.intro}
        </section>

        <section className="list--projects">
          {projects.map(p => <ProjectItem project={p} key={p.id} />)}
        </section>

        <IndexSectionComponent />

        <section className="about" id="about">
          {author.about}
        </section>

        <section className="contact">
          <div className="email">
            {author.email}
          </div>
          <div className="phone">
            {author.phone}
          </div>
        </section>

        <section className="designby">
          {author.designby}
        </section>

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
