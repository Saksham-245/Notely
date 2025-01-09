import React from "react";
import { Path, Rect, Svg } from "react-native-svg";

export default function LogoutIcon() {
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
        d="M23.293 20.293a1 1 0 001.414 1.414l2.913-2.913.044-.046a.998.998 0 000-1.496 1.112 1.112 0 00-.044-.046l-2.913-2.913a1 1 0 00-1.414 1.414L24.586 17H19a1 1 0 100 2h5.586l-1.293 1.293z"
        fill="#D9614C"
      />
      <Path
        d="M11 8a3 3 0 00-3 3v14a3 3 0 003 3h9.5a2.5 2.5 0 002.5-2.5v-2.767A2.002 2.002 0 0122.267 20H19a2 2 0 110-4h3.267A2 2 0 0123 13.267V10.5A2.5 2.5 0 0020.5 8H11z"
        fill="#D9614C"
      />
    </Svg>
  );
}
