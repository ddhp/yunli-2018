import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Swipeable from 'react-swipeable';
import './style.scss';

class ProjectItem extends React.Component {
  constructor(props) {
    super(props);

    this.onControlClick = this.onControlClick.bind(this);
    this.onThumbnailClick = this.onThumbnailClick.bind(this);
    this.onSwipedRight = this.onControlClick.bind(this, {
      currentTarget: {
        getAttribute: () => 'left',
      },
    });
    this.onSwipedLeft = this.onControlClick.bind(this, {
      currentTarget: {
        getAttribute: () => 'right',
      },
    });

    this.state = {
      currentIndex: 0,
    };
  }

  onControlClick(e) {
    const dir = e.currentTarget.getAttribute('data-dir');
    const { currentIndex } = this.state;
    const { project } = this.props;
    const { images } = project;
    let nextIndex;
    if (dir === 'left') {
      nextIndex = Math.max(0, currentIndex - 1);
    } else {
      nextIndex = Math.min(images.length - 1, currentIndex + 1);
    }
    this.setState({
      currentIndex: nextIndex,
    });
  }

  onThumbnailClick(e) {
    const index = e.currentTarget.getAttribute('data-index');
    this.setState({
      currentIndex: index,
    });
  }

  renderThumbnails() {
    const { project } = this.props;
    const { images } = project;
    const { currentIndex } = this.state;
    return (
      <div className="gallery__thumbnails">
        {images.map((image, i) => (
          <div
            className={classNames('thumbnail', {
              active: parseInt(currentIndex, 10) === i,
            })}
            key={image.id}
            data-index={i}
            onClick={this.onThumbnailClick}
            onKeyPress={this.onThumbnailClick}
            tabIndex="0"
            role="button"
          >
            {i + 1}
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { project } = this.props;
    const { images } = project;
    const { currentIndex } = this.state;

    return (
      <div className="project-item" id={project.name}>
        <div className="name">{project.name}</div>
        <div className="gallery">
          <div className="gallery__body-wrapper">
            <Swipeable
              onSwipedRight={this.onSwipedRight}
              onSwipedLeft={this.onSwipedLeft}
              preventDefaultTouchmoveEvent
              stopPropagation
            >
              <div
                className="gallery__body"
                style={{
                  transform: `translateX(-${currentIndex}00%)`,
                }}
              >
                {images.map(i => (<img
                  src={`${i.prepend}${i.filename}`}
                  key={i.id}
                  alt={i.filename}
                />))}
              </div>
              <div className="gallery__controls">
                <div
                  className="to-left"
                  data-dir="left"
                  onClick={this.onControlClick}
                  onKeyPress={this.onControlClick}
                  role="button"
                  tabIndex="0"
                >
                  {'<-'}
                </div>
                <div
                  className="to-right"
                  data-dir="right"
                  onClick={this.onControlClick}
                  onKeyPress={this.onControlClick}
                  role="button"
                  tabIndex="-1"
                >
                  {'->'}
                </div>
              </div>
            </Swipeable>
          </div>
        </div>
        <div className="project__body">
          <div className="project__body-left">
            {this.renderThumbnails()}
            <div className="year">{project.year}</div>
            <div className="project-type">{project.projectType}</div>
            <div className="subtitle">{project.subtitle}</div>
          </div>
          <div className="description">{project.description}</div>
        </div>
      </div>
    );
  }
}

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectItem;
