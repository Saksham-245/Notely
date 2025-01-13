import React from "react";
import { Path, Svg } from "react-native-svg";

export default function CloseIcon({ ...props }) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.471 3.547L9.857 7.16 6.243 3.544a2.066 2.066 0 10-2.919 2.923l3.613 3.615-3.61 3.61a2.068 2.068 0 002.924 2.925L9.857 13l3.612 3.613a2.065 2.065 0 003.402-.652 2.068 2.068 0 00-.48-2.27l-3.605-3.608 3.61-3.61a2.068 2.068 0 00-2.925-2.926z"
        fill="#403B36"
      />
    </Svg>
  );
}
