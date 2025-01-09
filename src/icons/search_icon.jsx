import React from 'react'
import { ClipPath, Defs, G, Path, Svg } from 'react-native-svg'

export default function SearchIcon() {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_3_742)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.613 2.396a7.97 7.97 0 10-1.839 12.638l4.776 4.537a1.319 1.319 0 001.839-.022l1.225-1.226a1.317 1.317 0 000-1.857l-4.634-4.643a7.965 7.965 0 00-1.367-9.427zm-2.367 8.898a4.619 4.619 0 110-6.53 4.627 4.627 0 010 6.53z"
          fill="#403B36"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3_742">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
