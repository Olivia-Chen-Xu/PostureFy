import React, { useState, useEffect } from "react";

export const Chronometer = ({ onTriggerNotification }) => {
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    // hours: 0,
  });

  useEffect(() => {
    let isCancelled = false;

    const advanceTime = () => {
      setTimeout(() => {
        let nSeconds = time.seconds;
        let nMinutes = time.minutes;
        // let nHours = time.hours;

        nSeconds++;

        if (nSeconds > 59) {
          nMinutes++;
          nSeconds = 0;
        }
        // if (nMinutes > 59) {
        //   nHours++;
        //   nMinutes = 0;
        // }
        // if (nHours > 24) {
        //   nHours = 0;
        // }

        if (nSeconds === 5) {
          onTriggerNotification();
        }

        //hours: nHours
        !isCancelled && setTime({ seconds: nSeconds, minutes: nMinutes });
      }, 1000);
    };
    advanceTime();

    return () => {
      //final time:
      console.log(time);
      isCancelled = true;
    };
  }, [time]);

  //${time.hours < 10 ? '0' + time.hours : time.hours} :
  return (
    <div>
      <p>
        {`
          
          ${time.minutes < 10 ? "0" + time.minutes : time.minutes} :
          ${time.seconds < 10 ? "0" + time.seconds : time.seconds}
        `}
      </p>
    </div>
  );
};
