import { Action, State } from './types';

const initialState: State = {
}

export const Reducer = (state = initialState, action: Action) => {
  switch(action.type) {
    default:
      return state;
  }
}