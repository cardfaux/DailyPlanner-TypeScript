import { css } from 'styled-components';

export const Absolute: object = ({ x = 0, y = 0 } = {}) => {
  return css`
    position: absolute;
    top: ${y};
    left: ${x};
  `;
};

export const Fixed: object = ({ x = 0, y = 0 } = {}) => {
  return css`
    position: fixed;
    top: ${y};
    left: ${x};
  `;
};
