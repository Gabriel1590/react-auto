/*
  An example of adding constants types

  export const TYPE = 'TYPE';
  export const TYPE2 = 'TYPE2';

  export interface State {
    foo?: string;
  }

  export interface Action {
    type: 'TYPE' | 'TYPE2';
    payload?: State
  }  
*/

export interface State {
}

export interface Action {
  type: string;
  payload?: State;
}