import React from "react";
import Canada from "../components/CanadaMap/Canada";

export default function Map() {
  const handleClick = (province: string) => {
    console.log(province);
  };

  return (
    <div>
      <Canada
        fillColor="#50aaeb"
        onHoverColor="#a1d7ff"
        onClick={handleClick}
      ></Canada>
    </div>
  );
}
