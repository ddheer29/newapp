import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const BackArrow = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#666"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-move-left"
    {...props}>
    <Path d="M6 8L2 12L6 16" />
    <Path d="M2 12H22" />
  </Svg>
);
export default BackArrow;
