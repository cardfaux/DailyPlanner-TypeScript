import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  buttonPrimary,
  buttonLightPrimary,
  buttonDanger,
  buttonActiveDanger,
  buttonDisabledWhite,
  buttonDisabledGray
} from '../../../../Styles/JS/Colors';

interface ButtonProps {
  className?: string;
  size?: string;
  inverse?: boolean;
  danger?: boolean;
  href?: string;
  to?: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => any;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
  if (props.href) {
    return (
      <div className={props.className}>
        <a
          className={`button button--${props.size ||
            'default'} ${props.inverse && 'button--inverse'} ${props.danger &&
            'button--danger'}`}
          href={props.href}
        >
          {props.children}
        </a>
      </div>
    );
  }
  if (props.to) {
    return (
      <div className={props.className}>
        <Link
          to={props.to}
          className={`button button--${props.size ||
            'default'} ${props.inverse && 'button--inverse'} ${props.danger &&
            'button--danger'}`}
        >
          {props.children}
        </Link>
      </div>
    );
  }
  return (
    <div className={props.className}>
      <button
        className={`button button--${props.size || 'default'} ${props.inverse &&
          'button--inverse'} ${props.danger && 'button--danger'}`}
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </div>
  );
};

export default styled(Button)`
  .button {
    font: inherit;
    padding: 0.5rem 1.5rem;
    border: 1px solid ${buttonPrimary};
    border-radius: 4px;
    background: ${buttonPrimary};
    color: white;
    cursor: pointer;
    margin-right: 1rem;
    text-decoration: none;
    display: inline-block;
  }

  .button:focus {
    outline: none;
  }

  .button:hover,
  .button:active {
    background: ${buttonLightPrimary};
    border-color: ${buttonLightPrimary};
  }

  .button--inverse {
    background: transparent;
    color: ${buttonPrimary};
  }

  .button--inverse:hover,
  .button--inverse:active {
    color: white;
    background: ${buttonPrimary};
  }

  .button--danger {
    background: ${buttonDanger};
    border-color: ${buttonDanger};
  }

  .button--danger:hover,
  .button--danger:active {
    background: ${buttonActiveDanger};
    border-color: ${buttonActiveDanger};
  }

  .button:disabled,
  .button:hover:disabled,
  .button:active:disabled {
    background: ${buttonDisabledWhite};
    color: ${buttonDisabledGray};
    border-color: ${buttonDisabledWhite};
    cursor: not-allowed;
  }

  .button--small {
    font-size: 0.8rem;
  }

  .button--big {
    font-size: 1.5rem;
  }
`;
