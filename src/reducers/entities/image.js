import update from 'immutability-helper';

const initialState = {};
export default function imageReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'SET_IMAGE':
      return update(state, {
        $set: payload,
      });
    default:
      return state;
  }
}
