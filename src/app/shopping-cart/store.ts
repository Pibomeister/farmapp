import * as _ from 'lodash';

import { ADD_CART, DECREASE_CART, INCREASE_CART, REMOVE_CART, EMPTY_CART } from './actions';

import { tassign } from 'tassign';

export interface ICartState {
    cartItems: any[],
    cartCount: number,
    cartTotal: number
}

export const CART_INITIAL_STATE: ICartState = {
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

function cartItemCount(cartItems: any[]){
    return cartItems.reduce((acc, el) => acc + el.qty, 0);
}

function cartItemTotal(cartItems: any[]){
    return cartItems.reduce((acc, el) => acc + (el.qty * el.price), 0);
}

function calcNewCart(newList: any[]){
    return {
        cartItems: newList,
        cartCount: cartItemCount(newList),
        cartTotal: cartItemTotal(newList)
    };
}

function addItem(state, action){
    let idx = _.findIndex(state.cartItems, {'name': action.name});
    if(idx !== -1 ) return increaseItemCount(state, {index: idx});
    let newItem = {
        name: action.name,
        price: action.price,
        qty: 1,
        imgSrc: action.imgUrl
    };
    let newList = state.cartItems.concat(newItem);
    return tassign(state, calcNewCart(newList));
}

function removeItem(state, action){
    let newList = [
        ...state.cartItems.slice(0, action.index),
        ...state.cartItems.slice(action.index + 1)
    ];
    return tassign(state, calcNewCart(newList));
}

function increaseItemCount(state, action){
    let newList = [
        ...state.cartItems.slice(0, action.index),
        tassign(state.cartItems[action.index], {qty: (state.cartItems[action.index].qty + 1)}),
        ...state.cartItems.slice(action.index + 1)
    ];
    return tassign(state, calcNewCart(newList));
}

function decreaseItemCount(state, action){
    let prevQty = state.cartItems[action.index].qty;
    let newQty = prevQty > 0 ? (prevQty - 1) : 0;
    let newList = [
        ...state.cartItems.slice(0, action.index),
        tassign(state.cartItems[action.index], {qty: newQty}),
        ...state.cartItems.slice(action.index + 1)
    ];
    return tassign(state, calcNewCart(newList));
}

function emptyCart(state, action){
    return tassign(state, CART_INITIAL_STATE);
}

export function cartReducer(state: ICartState = CART_INITIAL_STATE, action): ICartState {
  switch (action.type) {
    case ADD_CART: return addItem(state, action);
    case REMOVE_CART: return removeItem(state, action);
    case INCREASE_CART: return increaseItemCount(state, action);
    case DECREASE_CART: return decreaseItemCount(state, action);
    case EMPTY_CART : return emptyCart(state,action);
  }
  return state; 
}