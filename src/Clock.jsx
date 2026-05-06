import { useEffect, useState } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(function () {
    const timer = setInterval(function () {
      setTime(new Date());
    }, 1000);

    return function () {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="panel section-card clock-card">
      <h3>Ceas live</h3>
      <p className="clock-time">{time.toLocaleTimeString()}</p>
    </div>
  );
}

export default Clock;
