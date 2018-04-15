import { normalize } from 'normalizr';
import schema from '../schemas';
import stdout from '../stdout';

const debug = stdout('actions/home');

export default {
  setProject: project => ({
    type: 'SET_PROJECT',
    payload: project,
  }),

  setDefaultData: defaultData => (dispatch) => {
    const { entities } = normalize(defaultData, schema.defaultData);
    const { project, image, author } = entities;
    debug(image);
    dispatch({
      type: 'SET_PROJECT',
      payload: project,
    });
    dispatch({
      type: 'SET_IMAGE',
      payload: image,
    });
    dispatch({
      type: 'SET_HOME',
      payload: {
        projects: defaultData.projects,
      },
    });
    dispatch({
      type: 'SET_AUTHOR',
      payload: author,
    });
  },
};
