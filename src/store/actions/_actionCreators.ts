import { AnyAction } from "redux";

const createAction: <T = string>(type: T) => () => AnyAction = <T = string>(
  type: T
) => {
  return () => ({ type });
};

const createActionWithPayload: <T = string, P = any>(
  type: T
) => (payload: P) => AnyAction = <T = string, P = any>(type: T) => {
  return (payload: P) => ({ type, payload });
};

export { createAction, createActionWithPayload };
