import update from 'immutability-helper';

const initialState = {};
export default function authorReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'SET_AUTHOR':
      return update(state, {
        $set: payload,
      });
    default:
      return state;
  }
}
