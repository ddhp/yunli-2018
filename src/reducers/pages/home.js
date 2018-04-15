import update from 'immutability-helper';
// import { get as _get } from 'lodash';
import stdout from '../../stdout';

const debug = stdout('reducer/pages/home');

const initialState = {
  projects: [],
};

export default function homeReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'SET_HOME': {
      debug(payload.projects);
      const ids = payload.projects.map(p => p.id);
      return update(state, {
        projects: {
          $set: ids,
        },
      });
    }

    default:
      return state;
  }
}
