import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TimerController } from "./components/TimerController";
import { useRecoilState } from "recoil";
import { minuteState, secondsState } from "./atoms";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: tomato;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Header = styled.h1`
  color: white;
  font-size: 40px;
  font-weight: 800;
`;

const Timer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  width: 100%;
  span {
    color: white;
  }
`;
const Time = styled(motion.div)`
  background-color: white;
  color: tomato;
  font-weight: 700;
  width: 200px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Controller = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.3);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CountWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

const Svg = styled.svg`
  fill: rgba(255, 255, 255, 1);
  font-size: 25px;
`;
const RoundAndGoal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 800;

  span:first-child {
    opacity: 0.6;
    margin-bottom: 7px;
  }
`;

const time = {
  invisible: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  leaving: {
    opacity: 0,
    scale: 0,
  },
  exit: { opacity: 0, scale: 0 },
};

export default function Pomodoro() {
  const [play, setPlay] = useState(true);
  const [minute, setMinute] = useRecoilState(minuteState);
  const [second, setSecond] = useRecoilState(secondsState);
  const { start, stop } = TimerController();
  const [round, setRound] = useState(0);
  const [goal, setGoal] = useState(0);

  const controlClick = () => {
    setPlay((p) => {
      if (p) start();
      else stop();
      return !p;
    });
  };

  useEffect(() => {
    if (!minute && !second) {
      stop();
      setPlay(true);
      setRound((r) => {
        if (r === 4) {
          setGoal((g) => g + 1);
          return 0;
        }
        return r + 1;
      });
      setMinute(25);
      setSecond(0);
    } else if (!second) {
      setMinute((m) => m - 1);
    }
  }, [second]);

  return (
    <Wrapper>
      <Header>Pomodoro</Header>
      <AnimatePresence>
        <Timer>
          <Time
            transition={{ type: "spring" }}
            key={`minute_${minute}`}
            variants={time}
            initial="invisible"
            animate="visible"
          >
            {minute < 10 ? `0${minute}` : minute}
          </Time>
          <span>:</span>
          <Time
            transition={{ type: "spring" }}
            key={`second_${second}`}
            variants={time}
            initial="invisible"
            animate="visible"
          >
            {second < 10 ? `0${second}` : second}
          </Time>
        </Timer>
      </AnimatePresence>
      <Controller
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => controlClick()}
      >
        {play ? (
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            height="2em"
            viewBox="0 0 384 512"
          >
            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
          </Svg>
        ) : (
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            height="2em"
            viewBox="0 0 320 512"
          >
            <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
          </Svg>
        )}
      </Controller>

      <CountWrapper>
        <RoundAndGoal>
          <span>{round}/4</span>
          <span>ROUND</span>
        </RoundAndGoal>
        <RoundAndGoal>
          <span>{goal}/12</span>
          <span>GOAL</span>
        </RoundAndGoal>
      </CountWrapper>
    </Wrapper>
  );
}
