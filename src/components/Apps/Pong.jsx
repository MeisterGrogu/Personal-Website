import { useRef, useEffect, useState } from "react";

const Pong = () => {
  const canvasRef = useRef(null);
  const aiScoreRef = useRef(0);
  const playerScoreRef = useRef(0);

  // Setze hier Standardwerte, canvas ist noch nicht verfügbar!
  const ballX = useRef(300);
  const ballY = useRef(200);
  const ballSpeedX = useRef(4);
  const ballSpeedY = useRef(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const paddleHeight = 75;
    const paddleWidth = 10;
    const ballRadius = 8;

    let playerY = (canvas.height - paddleHeight) / 2;
    let aiY = playerY;

    const playerSpeed = 6;
    let upPressed = false;
    let downPressed = false;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(ballX.current, ballY.current, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.closePath();

      ctx.fillRect(0, playerY, paddleWidth, paddleHeight);
      ctx.fillRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight);

      ctx.fillStyle = "#fff";
      ctx.font = "20px Arial";
      ctx.fillText(`Player: ${playerScoreRef.current}`, 20, 30);
      ctx.fillText(`AI: ${aiScoreRef.current}`, canvas.width - 100, 30);
    };

    const update = () => {
      ballX.current += ballSpeedX.current;
      ballY.current += ballSpeedY.current;

      if (
        ballY.current + ballRadius > canvas.height ||
        ballY.current - ballRadius < 0
      ) {
        ballSpeedY.current *= -1;
      }

      if (
        ballX.current - ballRadius < paddleWidth &&
        ballY.current > playerY &&
        ballY.current < playerY + paddleHeight
      ) {
        ballSpeedX.current *= -1;
      }

      if (
        ballX.current + ballRadius > canvas.width - paddleWidth &&
        ballY.current > aiY &&
        ballY.current < aiY + paddleHeight
      ) {
        ballSpeedX.current *= -1;
      }

      if (ballX.current < 0) {
        aiScoreRef.current += 1;
        ballX.current = canvas.width / 2;
        ballY.current = canvas.height / 2;
        ballSpeedX.current *= -1;
      } else if (ballX.current > canvas.width) {
        playerScoreRef.current += 1;
        ballX.current = canvas.width / 2;
        ballY.current = canvas.height / 2;
        ballSpeedX.current *= -1;
      }

      const center = aiY + paddleHeight / 2;
      if (Math.random() < 0.5) {
        if (center < ballY.current - 35) aiY += playerSpeed;
        else if (center > ballY.current + 35) aiY -= playerSpeed;
      } else {
        if (center < ballY.current - 45) aiY += playerSpeed;
        else if (center > ballY.current + 45) aiY -= playerSpeed;
      }

      if (upPressed && playerY > 0) playerY -= playerSpeed;
      if (downPressed && playerY + paddleHeight < canvas.height)
        playerY += playerSpeed;
    };

    const loop = () => {
      update();
      draw();
      requestAnimationFrame(loop);
    };

    loop();

    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") upPressed = true;
      if (e.key === "ArrowDown") downPressed = true;
    };

    const handleKeyUp = (e) => {
      if (e.key === "ArrowUp") upPressed = false;
      if (e.key === "ArrowDown") downPressed = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="w-full flex justify-center items-center h-full bg-gray-800">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="border-2 border-white"
      ></canvas>
    </div>
  );
};

export default Pong;
