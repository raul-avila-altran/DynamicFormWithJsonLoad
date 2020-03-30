// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux
const LOAD = 'redux-form-examples/account/LOAD';
const UPDATE_TASK = 'redux-form-examples/account/UPDATE_TASK';

const reducer = (state = {}, action) => {
  console.log(action)
  switch (action.type) {
    case LOAD:
      return {
        data: action.data,
      };
    case UPDATE_TASK:
      return{
        data: action.data,

      };    
    default:
      return state;
  }
};

/**
 * Simulates data loaded into this reducer from somewhere
 */
export const load = data => ({ type: LOAD, data });

/**
 * Simulates data loaded into this reducer from somewhere
 */
export const updateTask = data => ({ type: UPDATE_TASK, data });

export default reducer;
