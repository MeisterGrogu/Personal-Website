import { useState, useEffect } from "react";

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes;
  return strTime;
}

const Clock = () => {
  let prevTime = formatAMPM(new Date());
  const [currentTime, setCurrentTime] = useState(formatAMPM(new Date()));

  useEffect(() => {
    setInterval(() => {
      const time = formatAMPM(new Date());
      if (prevTime != time) {
        setCurrentTime(time);
        prevTime = time;
      }
    }, 1000);
  }, []);

  return <p className="text-[13px] sm:text-[12px] pt-[1px]">{currentTime}</p>;
};

export default Clock;
