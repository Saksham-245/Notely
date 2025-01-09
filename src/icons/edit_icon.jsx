import React from "react";
import { Path, Rect, Svg } from "react-native-svg";

export default function EditIcon() {
  return (
    <Svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width={36} height={36} rx={8} fill="#FFFDFA" />
      <Rect
        x={0.5}
        y={0.5}
        width={35}
        height={35}
        rx={7.5}
        stroke="#E6EEF2"
        strokeOpacity={0.5}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.019 14.88c1.288-1.293 1.233-2.99.271-4.03a2.647 2.647 0 00-1.892-.85c-.759-.017-1.545.273-2.27.88a.799.799 0 00-.053.049L10.7 21.345a2.4 2.4 0 00-.7 1.694v1.355c0 .88.714 1.606 1.603 1.606h1.343a2.4 2.4 0 001.7-.706L25.02 14.88zm-2.712-1.987a1 1 0 00-1.414 1.414l.8.8a1 1 0 101.414-1.414l-.8-.8z"
        fill="#D9614C"
      />
    </Svg>
  );
}
