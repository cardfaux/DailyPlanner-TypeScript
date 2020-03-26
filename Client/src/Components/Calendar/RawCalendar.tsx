import React from 'react';
import styled from 'styled-components';

import { SonicSilver } from '../../Styles/JS/Colors';

interface Props {
  className?: string;
}

const RawCalendar: React.FunctionComponent<Props> = (props) => {
  return (
    <div className={props.className}>
      <div className='date-picker'>
        <div className='selected-date'>03 / 26 / 2020</div>

        <div className='dates'>
          <div className='month'>
            <div className='arrows prev-month'>&lt;</div>
            <div className='mth'>March 2020</div>
            <div className='arrows next-month'>&gt;</div>
          </div>

          <div className='days'></div>
        </div>
      </div>
    </div>
  );
};

export default styled(RawCalendar)`
  height: 100vh;
  width: 100vw;
  background: ${SonicSilver};
  .date-picker {
    position: relative;
    width: 100%;
    max-width: 320px;
    height: 60px;
    background-color: #fcfcfc;
    margin: 30px auto;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    user-select: none;
  }
  .date-picker .selected-date {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #313131;
    font-size: 28px;
  }
  .date-picker .dates {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fcfcfc;
  }
  .date-picker .dates .month {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #eee;
  }
  .date-picker .dates .month .arrows {
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #313131;
    font-size: 20px;
    &:hover {
      background-color: #f3f3f3;
    }
    &:active {
      background-color: #00ca85;
    }
  }
  .date-picker .dates .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    height: 200px;
  }
  .date-picker .dates .days .day {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #313131;
  }
  .date-picker .dates .days .day .selected {
    background-color: #00ca85;
  }
`;