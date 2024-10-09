import React, { useEffect, useState } from "react";
import { AiFillAliwangwang } from "react-icons/ai";
import { IoReorderThree } from "react-icons/io5";

const IconToggle = () => {
  const [currentIcon, setCurrentIcon] = useState("ai");
  const [rotation, setRotation] = useState(0);
  const intervals = [
    5000, 2000, 3322, 2500, 3333, 100, 500, 6231, 1000, 3000, 6000, 7000
  ];
  const [newIntervals, setNewIntervals] = useState<number>(
    intervals[Math.floor(Math.random() * intervals.length)]
  );
  useEffect(() => {
    setNewIntervals(intervals[Math.floor(Math.random() * intervals.length)]);
  }, [rotation, setRotation]);
  useEffect(() => {
    const changeIconInterval = setInterval(() => {
      setRotation((prev) => prev + 180);
      setCurrentIcon((prev) => (prev === "ai" ? "reorder" : "ai"));
    }, newIntervals);

    return () => clearInterval(changeIconInterval);
  }, [newIntervals]);

  return (
    <div
      className="flex items-center justify-start"
      style={{ cursor: "pointer" }}
    >
      <div
        onClick={() => {
          setRotation((prev) => prev + 180);
          setCurrentIcon((prev) => (prev === "ai" ? "reorder" : "ai"));
        }}
        style={{
          transition: "transform 1s ease",
          transform: `rotate(${rotation}deg)`,
          transformOrigin: "center center"
        }}
      >
        <div>
          {currentIcon === "ai" ? (
            <AiFillAliwangwang size={50} />
          ) : (
            <IoReorderThree size={50} />
          )}
        </div>
      </div>
    </div>
  );
};

export default IconToggle;
