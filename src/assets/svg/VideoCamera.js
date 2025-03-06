import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
const VideoCamera = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#666"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-video"
    {...props}>
    <Path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
    <Rect x={2} y={6} width={14} height={12} rx={2} />
  </Svg>
);
export default VideoCamera;
