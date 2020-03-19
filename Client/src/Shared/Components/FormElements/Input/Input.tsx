import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';

import { validate } from '../../../../Utils/Validators';

import {
  OffWhite,
  Black,
  Primary,
  heildburgRed,
  LightRed
} from '../../../../Styles/JS/Colors';

type ActionType = {
  type: 'CHANGE' | 'TOUCH';
  inputId?: string | number;
  isValid?: boolean;
  value?: string | number;
  inputs?: string;
  validators?: object;
  val?: string;
};

type StateType = {
  inputs?: any;
  value?: string;
  isValid?: boolean;
  isTouched?: boolean;
};

// Set up Reducer Outside Of The Component
const inputReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    // Fires On A Change Action
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    // Touch Case For The onBlur Below
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      };
    }
    default:
      return state;
  }
};

type InputProps = {
  initialValue?: string;
  initialValid?: boolean;
  id?: any;
  onInput?: (id: number, value: string, isValid: boolean) => any;
  value?: string;
  validators?: any;
  element?: string;
  type?: string;
  placeholder?: string;
  rows?: any;
  className?: string;
  label?: string;
  errorText?: string;
};

const Input = (props: InputProps) => {
  // Pass In inputReducer, An Optional Object Of Initial State
  // Dispatch Is A Function Which We Can Call, To Dispatch Actions To The Reducer Function
  // The Dispatch Function Will Update The InputState And ReRrender The Component
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });

  // Destructure To Use On These Properties To Avoid Infinte Loops
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    // onInput Is Set outside As A Prop To Be Informed About Changes
    // ID Is Set From OutSide
    onInput(id, value, isValid);
    // Array of things that should trigger the function
  }, [id, value, isValid, onInput]);

  // Triggers When The User Enters Something
  // Call Dispatch, The Object is an Action Object
  // action.val and action.validators refers to this
  const changeHandler = (event: { target: { value: any } }) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      // VALIDATOR_REQUIRE function gets passed in from outside
      validators: props.validators
    });
  };

  // Controls The onBlur For The Input
  const touchHandler = () => {
    // Dispatch A New Action
    dispatch({
      type: 'TOUCH'
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        // onBlur Lets The User Input Atleast One Character Before Erroring
        onBlur={touchHandler}
        // inputState.value is coming from useReducer
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        // inputState.value is coming from useReducer
        value={inputState.value}
      />
    );

  return (
    // The Div To The Label And Input
    <div className={props.className}>
      <div
        className={`form-control ${!inputState.isValid &&
          inputState.isTouched &&
          'form-control--invalid'}`}
      >
        {/* The Element Is For The Input Or Text Area Configured Above */}
        <label htmlFor={props.id}>{props.label}</label>
        {element}
        {/* If The Input is Invalid We Will Get Error Text */}
        {!inputState.isValid && inputState.isTouched && (
          <p>{props.errorText}</p>
        )}
      </div>
    </div>
  );
};

export default styled(Input)`
  .form-control {
    margin: 1rem 0;
  }

  .form-control label,
  .form-control input,
  .form-control textarea {
    display: block;
  }

  .form-control label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .form-control input,
  .form-control textarea {
    width: 100%;
    font: inherit;
    border: 1px solid ${Black};
    background: ${OffWhite};
    padding: 0.15rem 0.25rem;
  }

  .form-control input:focus,
  .form-control textarea:focus {
    outline: none;
    background: ${OffWhite};
    border-color: ${Primary};
  }

  .form-control--invalid label,
  .form-control--invalid p {
    color: ${heildburgRed};
  }

  .form-control--invalid input,
  .form-control--invalid textarea {
    border-color: ${heildburgRed};
    background: ${LightRed};
  }
`;
