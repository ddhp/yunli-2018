import update from 'immutability-helper';

const initialState = {};
export default function projectReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'SET_PROJECT':
      return update(state, {
        $set: payload,
      });
    default:
      return state;
  }
}
