import { AppDispatch } from "../redux/store";

// Updated to allow passing an action creator and its payload (like an ID)
export const retryAction = <T>(
  dispatch: AppDispatch,
  actionCreator: (arg: T) => any,
  payload?: T
) => {
  dispatch(actionCreator(payload as T));
};
