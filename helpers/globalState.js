import { createGlobalState } from "react-hooks-global-state";

export const { setGlobalState, useGlobalState } = createGlobalState({
  profilepic: "",
  username: "",
  darkmode: false,
});
