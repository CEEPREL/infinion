import { AppDispatch } from "../redux/store";
// this is a retry function that takes in a dispatch function and an action function you can use it anywhere in the code
export const retryAction = (dispatch: AppDispatch, action: any) => {
  dispatch(action());
};
