import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

type Props = {
  roomId: string;
};

const Canvas = ({ roomId }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection
    const socketConnection = io("http://localhost:5001"); // Backend server address
    setSocket(socketConnection);

    // Join the room
    socketConnection.emit("join_room", roomId);

    // Listen for drawing data from other users in the room
    socketConnection.on(
      "drawing",
      (data: { type: string; offsetX: number; offsetY: number }) => {
        if (canvasContextRef.current) {
          if (data.type === "begin") {
            canvasContextRef.current.beginPath();
            canvasContextRef.current.moveTo(data.offsetX, data.offsetY);
          } else if (data.type === "draw") {
            canvasContextRef.current.lineTo(data.offsetX, data.offsetY);
            canvasContextRef.current.stroke();
          } else if (data.type === "end") {
            canvasContextRef.current.closePath();
          }
        }
      }
    );

    return () => {
      socketConnection.disconnect(); // Clean up on unmount
    };
  }, [roomId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const context = canvas.getContext("2d");
      if (context) {
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

    // Emit the start of drawing to other users
    if (socket) {
      socket.emit("drawing", { room: roomId, offsetX, offsetY, type: "begin" });
    }
  };

  const finishDrawing = () => {
    canvasContextRef.current?.closePath();
    setIsDrawing(false);

    // Emit the end of drawing to other users
    if (socket) {
      socket.emit("drawing", { room: roomId, type: "end" });
    }
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLElement>) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;

    // Draw locally
    canvasContextRef.current?.lineTo(offsetX, offsetY);
    canvasContextRef.current?.stroke();

    // Emit drawing data to other users
    if (socket) {
      socket.emit("drawing", { room: roomId, offsetX, offsetY, type: "draw" });
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      />
    </>
  );
};

export default Canvas;
