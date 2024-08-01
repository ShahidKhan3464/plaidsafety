import React from "react";
import { Icons } from "assets";

const Spinner = () => {
  const style = {
    top: "50%",
    left: "50%",
    position: "fixed",
    transform: "translate(-50%, -50%)",
  };

  return <img src={Icons.splashScreen} style={style} alt="splash-screen" />;
};
export default Spinner;
