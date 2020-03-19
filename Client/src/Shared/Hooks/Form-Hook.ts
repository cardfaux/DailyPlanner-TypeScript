import { useCallback, useReducer } from 'react';

type ActionType = {
  type: 'INPUT_CHANGE' | 'SET_DATA';
  inputId?: string | number;
  isValid?: boolean;
  value?: string | number;
  inputs?: string;
  formIsValid?: boolean;
};

type StateType = {
  inputs?: any;
};

const formReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      };
    default:
      return state;
  }
};

export const useForm = (
  initialInputs: object | any,
  initialFormValidity: boolean
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    // InitialState Values
    inputs: initialInputs,
    isValid: initialFormValidity
  });

  // Gets Triggered When An Input Is Changed
  // useCallback To Keep This Function From Being Created Again When The Component Function ReRenders
  // Checks If The Overall Form Is Valid
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  const setFormData: any = useCallback(
    (inputData: string, formValidity: boolean) => {
      dispatch({
        type: 'SET_DATA',
        inputs: inputData,
        formIsValid: formValidity
      });
    },
    []
  );

  return [formState, inputHandler, setFormData];
};
