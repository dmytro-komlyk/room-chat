/* Core */
import {
  AnyAction,
  CombinedState,
  configureStore,
  type Action,
  type ThunkAction,
} from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
/* Instruments */
import { middleware } from './middleware';
import rootReducers from './rootReducer';
import { IRoomState } from './slices';

const reducer = (
  state: CombinedState<{ room: IRoomState }> | undefined,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return rootReducers(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(middleware);
    },
    devTools: true,
  });

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;

/* Types */
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper(makeStore);
