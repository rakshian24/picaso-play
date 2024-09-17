import React, { useEffect, useRef, useState } from "react";
import shutterSound from "../assets/voices/shutter-click.wav";

type Props = {};

const Canvas = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const clickSound = new Audio(shutterSound);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const context = canvas.getContext("2d");
      if (context && canvasContextRef) {
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        canvasContextRef.current = context;
      }
    }
  }, []);

  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLElement>) => {
    const { offsetX, offsetY } = nativeEvent;

    canvasContextRef.current?.beginPath();
    canvasContextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    canvasContextRef.current?.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLElement>) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    canvasContextRef.current?.lineTo(offsetX, offsetY);
    canvasContextRef.current?.stroke();
  };

  const handleTakeScreenshot = () => {
    clickSound.play();

    const canvas = canvasRef.current;
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "canvas-screenshot.png";
      link.click();
    }
  };

  return (
    <>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      <button onClick={handleTakeScreenshot}>Take Screenshot</button>
    </>
  );
};

export default Canvas;
