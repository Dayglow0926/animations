import { atom } from "recoil";

export const minuteState = atom<number>({
  key: "minute",
  default: 25,
});

export const secondsState = atom<number>({
  key: "seconds",
  default: 0,
});
