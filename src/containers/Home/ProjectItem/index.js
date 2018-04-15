import React from 'react';
import PropTypes from 'prop-types';
import GalleryComponent from '../Gallery';
import './style.scss';

const ProjectItem = ({ project }) => (
  <div className="project-item">
    <div className="name">{project.name}</div>
    <GalleryComponent images={project.images} />
    <div className="year">{project.year}</div>
    <div className="project-type">{project.projectType}</div>
    <div className="subtitle">{project.subtitle}</div>
    <div className="description">{project.description}</div>
  </div>
);

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectItem;
