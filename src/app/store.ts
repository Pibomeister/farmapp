import { CART_INITIAL_STATE, ICartState, cartReducer } from './shopping-cart/store';

import { IAppState } from './store';
import { Reducer } from 'redux';
import { combineReducers } from 'redux';
import { tassign } from 'tassign';

export interface IAppState {
    cart: ICartState;
}

export const INITIAL_STATE: IAppState = {
    cart: CART_INITIAL_STATE
};

export const rootReducer: Reducer<IAppState> = <Reducer<IAppState>>combineReducers({
    cart: cartReducer
});

