import { combineReducers } from 'redux';
import projectReducer from './project';
import imageReducer from './image';
import authorReducer from './author';

export default combineReducers({
  project: projectReducer,
  image: imageReducer,
  author: authorReducer,
});
