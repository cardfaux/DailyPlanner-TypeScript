import React from 'react';
import { useSpring, animated } from 'react-spring';

import { MainHead } from './MainHeader.styles';

interface HeaderProps {
  children: React.ReactNode;
}

const MainHeader: React.FunctionComponent<HeaderProps> = (props) => {
  const fade = useSpring({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  });

  return (
    <animated.div style={fade}>
      <MainHead>{props.children}</MainHead>
    </animated.div>
  );
};

export default MainHeader;
