import React from 'react';
import styled from 'styled-components';

import { Primary, Secondary } from '../../../../Styles/JS/Colors';

interface SpinnerProps {
  className?: string;
  asOverlay?: boolean;
}

const LoadingSpinner: React.FunctionComponent<SpinnerProps> = (props) => {
  return (
    <div className={props.className}>
      <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
        <div className='lds-dual-ring'></div>
      </div>
    </div>
  );
};

export default styled(LoadingSpinner)`
  .lds-dual-ring {
    display: inline-block;
    width: 64px;
    height: 64px;
  }

  .lds-dual-ring:after {
    content: ' ';
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid ${Primary};
    border-color: ${Primary} transparent ${Secondary} transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  .loading-spinner__overlay {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
