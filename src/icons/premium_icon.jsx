import React from "react";
import { Path, Rect, Svg } from "react-native-svg";

export default function PremiumIcon() {
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
        d="M12 15a6 6 0 1112.001 0A6 6 0 0112 15z"
        fill="#D9614C"
      />
      <Path
        d="M13.11 20.01l-.964 2.89c-.859 2.579 1.877 4.88 4.27 3.591l1.11-.598a1 1 0 01.949 0l1.111.598c2.393 1.288 5.129-1.012 4.27-3.59l-.965-2.892a6.978 6.978 0 01-4.89 1.992 6.978 6.978 0 01-4.891-1.991z"
        fill="#D9614C"
      />
    </Svg>
  );
}
