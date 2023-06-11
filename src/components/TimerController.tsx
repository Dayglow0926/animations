import { useRecoilState } from "recoil";
import { minuteState, secondsState } from "../atoms";
import { useCallback, useRef } from "react";

//사용자 정의 Hook
export const TimerController = () => {
  const [minute, setMinute] = useRecoilState(minuteState);
  const [second, setSecond] = useRecoilState(secondsState);
  const intervalRef = useRef<NodeJS.Timer>();

  const start = useCallback(() => {
    if (intervalRef.current !== undefined) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setSecond((s) => {
        if (s === 0) {
          return 59;
        } else {
          return s - 1;
        }
      });
    }, 1000);
  }, []);
  const stop = useCallback(() => {
    if (intervalRef.current === undefined) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  }, []);
  return { start, stop };
};
