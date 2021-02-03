import React, { useReducer, useEffect } from 'react';

import { validate } from '../validators/validators';
import styles from './Input.module.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isValid: props.initialValid || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    props.onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  // const element =
  //   props.element === 'input' ? (
  //     <input
  //       id={props.id}
  //       type={props.type}
  //       placeholder={props.placeholder}
  //       onChange={changeHandler}
  //       value={inputState.value}
  //       onBlur={touchHandler}
  //     />
  //   ) : (
  //     <textarea
  //       id={props.id}
  //       rows={props.rows || 3}
  //       onChange={changeHandler}
  //       value={inputState.value}
  //       onBlur={touchHandler}
  //     />
  //   );

  let element;
  if (props.element === 'input') {
    element = (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );
  } else if (props.element === 'textarea') {
    element = (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );
  } else if (props.element === 'checkbox') {
    element = (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );
  } else if (props.element === 'radio') {
    element = (
      <label htmlfor={props.id} className={styles.radioDiv}>
        <input
          type="radio"
          id={props.id}
          name="image"
          value={props.src}
          className={styles.radio}
          onChange={changeHandler}
        />
        {<img src={props.src} alt={props.src} className={styles.radioImg} />}
      </label>
      // <div className={styles.radioDiv}>
      //   <input
      //     id={props.id}
      //     type={props.type}
      //     placeholder={props.placeholder}
      //     onChange={changeHandler}
      //     value={inputState.value}
      //     onBlur={touchHandler}
      //     className={styles.radio}
      //     // checked={props.checked}
      //   />
      //   <img src={props.src} alt={props.src} className={styles.radioImg} />
      // </div>
    );
  }

  return (
    <div
      className={`${styles.formControl} ${
        !inputState.isValid && inputState.isTouched && styles.formControlInvalid
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && props.errorText && (
        <p>{props.errorText}</p>
      )}
    </div>
  );
};

export default Input;
