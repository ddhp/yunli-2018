import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Swipeable from 'react-swipeable';
import arrowPng from '../../../assets/images/arrowx2.png';
import './style.scss';

class ProjectItem extends React.Component {
  constructor(props) {
    super(props);

    this.onControlClick = this.onControlClick.bind(this);
    this.onThumbnailClick = this.onThumbnailClick.bind(this);
    this.onControlMouseEnter = this.onControlMouseEnter.bind(this);
    this.onControlMouseLeave = this.onControlMouseLeave.bind(this);
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
    if (nextIndex === 0) {
      this.setState({
        showLeftControl: false,
      });
    } else if (nextIndex === images.length - 1) {
      this.setState({
        showRightControl: false,
      });
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

  onControlMouseEnter(e) {
    const dir = e.currentTarget.getAttribute('data-dir');
    const { project } = this.props;
    const { images } = project;
    const { currentIndex } = this.state;
    if (dir === 'left') {
      if (currentIndex > 0) {
        return this.setState({
          showLeftControl: true,
        });
      }
    }
    if (dir === 'right') {
      if (currentIndex < images.length - 1) {
        return this.setState({
          showRightControl: true,
        });
      }
    }
    return null;
  }

  onControlMouseLeave(e) {
    const dir = e.currentTarget.getAttribute('data-dir');
    if (dir === 'left') {
      this.setState({
        showLeftControl: false,
      });
    } else {
      this.setState({
        showRightControl: false,
      });
    }
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
    const { currentIndex, showLeftControl, showRightControl } = this.state;

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
                  className={classNames('to-left', {
                    'is-shown': showLeftControl,
                  })}
                  data-dir="left"
                  onClick={this.onControlClick}
                  onKeyPress={this.onControlClick}
                  onMouseEnter={this.onControlMouseEnter}
                  onMouseLeave={this.onControlMouseLeave}
                  role="button"
                  tabIndex="0"
                >
                  <img src={arrowPng} alt="arrow-right" />
                </div>
                <div
                  className={classNames('to-right', {
                    'is-shown': showRightControl,
                  })}
                  data-dir="right"
                  onClick={this.onControlClick}
                  onKeyPress={this.onControlClick}
                  onMouseEnter={this.onControlMouseEnter}
                  onMouseLeave={this.onControlMouseLeave}
                  role="button"
                  tabIndex="-1"
                >
                  <img src={arrowPng} alt="arrow-right" />
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
