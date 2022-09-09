import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";
import { Cycle } from "../../../../@types/Cycles";
import { CountdownContainer, Separator } from "./styles";

interface CountdownProps {
  activeCycle: Cycle;
  cycles: Cycle[];
  activeCycleId: any;
  changeCycles: (cycles: Cycle[]) => void;
  changeActiveCycleId: (activeCycleId: string | null) => void;
}

export function Countdown({
  activeCycle,
  cycles,
  activeCycleId,
  changeCycles,
  changeActiveCycleId,
}: CountdownProps) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);

  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");

  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );
        if (secondsDifference >= totalSeconds) {
          const arrayWithInterruptedCycle = cycles.map((cycle) => {
            if (cycle.id === activeCycleId) {
              return { ...cycle, finishedDate: new Date() };
            } else {
              return cycle;
            }
          });

          changeCycles(arrayWithInterruptedCycle);

          changeActiveCycleId(null);

          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    useEffect(() => {
      if (activeCycle) {
        document.title = `${activeCycle.task} ${minutes}:${seconds}`;
      } else {
        document.title = "Pomodoro Timer";
      }
    }, [activeCycle, minutes, seconds]);

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
