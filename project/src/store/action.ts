import {createAction} from '@reduxjs/toolkit';

export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  CHANGE_DATA_CITY: 'CHANGE_DATA_CITY',
  GET_OFFERS: 'GET_OFFERS',
};

export const changeCityAction = createAction(Action.CHANGE_CITY, (value) => ({ payload: value }));
export const changeDataCityAction = createAction(Action.CHANGE_DATA_CITY, (value) => ({ payload: value }));
export const getOffersAction = createAction(Action.GET_OFFERS, (value) => ({ payload: value }));
