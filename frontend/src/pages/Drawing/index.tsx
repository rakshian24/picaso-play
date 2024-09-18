import React from "react";
import Canvas from "../../components/Canvas";
import { useParams } from "react-router-dom";

type Props = {};

const Drawing = (props: Props) => {
  const { roomId } = useParams();
  return <Canvas roomId={roomId || ""} />;
};

export default Drawing;
