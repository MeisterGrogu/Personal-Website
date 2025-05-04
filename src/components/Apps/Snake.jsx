import React, { useEffect, useRef, useState } from "react";

const gridSize = 20;

const Snake = () => {
  const [snake, setSnake] = useState([[10, 10]]);
  const [direction, setDirection] = useState([0, 1]);
  const directionRef = useRef([0, 1]);
  const [food, setFood] = useState([5, 5]);
  const [gameOver, setGameOver] = useState(false);
  const [directionChanged, setDirectionChanged] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (directionChanged) return;

      const [dx, dy] = directionRef.current;
      let newDirection;

      switch (e.key) {
        case "ArrowUp":
          newDirection = [-1, 0];
          break;
        case "ArrowDown":
          newDirection = [1, 0];
          break;
        case "ArrowLeft":
          newDirection = [0, -1];
          break;
        case "ArrowRight":
          newDirection = [0, 1];
          break;
        default:
          return;
      }

      // Prevent 180-degree turn if length > 1
      if (
        snake.length > 1 &&
        dx + newDirection[0] === 0 &&
        dy + newDirection[1] === 0
      ) {
        return;
      }

      setDirection(newDirection);
      directionRef.current = newDirection;
      setDirectionChanged(true); // Limit to one change per tick
    };

    document.addEventListener("keydown", handleKeyDown);
    const interval = setInterval(() => {
      moveSnake();
      setDirectionChanged(false); // Allow direction change again after tick
    }, 200);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, [snake, directionChanged]);

  const moveSnake = () => {
    const newHead = [
      (snake[0][0] + directionRef.current[0] + gridSize) % gridSize,
      (snake[0][1] + directionRef.current[1] + gridSize) % gridSize,
    ];

    if (snake.some(([x, y]) => x === newHead[0] && y === newHead[1])) {
      setGameOver(true);
      return;
    }

    const newSnake = [newHead, ...snake];

    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      let newFood;
      do {
        newFood = [
          Math.floor(Math.random() * gridSize),
          Math.floor(Math.random() * gridSize),
        ];
      } while (newSnake.some(([x, y]) => x === newFood[0] && y === newFood[1]));

      setFood(newFood);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  return (
    <div className="w-full h-full bg-black flex items-center justify-center text-white flex-col">
      {gameOver ? (
        <div>
          <h1 className="text-red-500 text-xl">Game Over</h1>
          <button
            className="mt-4 bg-gray-300 px-4 py-2 text-black"
            onClick={() => {
              setSnake([[10, 10]]);
              setDirection([0, 1]);
              directionRef.current = [0, 1];
              setFood([5, 5]);
              setGameOver(false);
              setDirectionChanged(false);
            }}
          >
            Restart
          </button>
        </div>
      ) : (
        <div
          className="grid"
          style={{
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            width: 400,
            height: 400,
          }}
        >
          {[...Array(gridSize * gridSize)].map((_, i) => {
            const x = Math.floor(i / gridSize);
            const y = i % gridSize;
            const isSnake = snake.some(([sx, sy]) => sx === x && sy === y);
            const isFood = food[0] === x && food[1] === y;
            return (
              <div
                key={i}
                className={`border border-gray-800 w-full h-full ${
                  isSnake ? "bg-green-500" : isFood ? "bg-red-500" : ""
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Snake;
