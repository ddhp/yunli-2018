import mount from './template';
// routes/main includes styles as well
// import global style first to make sure style is in right order
import './global.scss';
import Routes from '../routes/main';
import rootReducer from '../reducers/main';

mount(Routes, rootReducer);
