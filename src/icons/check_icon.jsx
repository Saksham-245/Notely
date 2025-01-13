import React from 'react'
import { Path, Svg } from 'react-native-svg'

export default function CheckIcon({...props}) {
  return (
    <Svg
      width={12}
      height={10}
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3.406 8.592L.429 5.614a1.47 1.47 0 112.078-2.078l1.865 1.862a.2.2 0 00.283 0L9.489.564a1.471 1.471 0 012.078 2.079L5.62 8.593a1.565 1.565 0 01-2.213 0z"
        fill="#5A5266"
      />
    </Svg>
  )
}
