import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { SonicSilver } from '../../Styles/JS/Colors';

const RawCalendar = (props) => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  let selectedDate = date;
  let selectedDay = day;
  let selectedMonth = month;
  let selectedYear = year;

  const [thisMonth, setThisMonth] = useState(month);
  const [thisYear, setThisYear] = useState(year);
  // const [thisDay, setThisDay] = useState(date.getDate());
  const [thisDay, setThisDay] = useState([]);
  const [allMonths, setAMonth] = useState([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]);

  const goToNextMonth = () => {
    console.log(allMonths);
    console.log(thisMonth);
    if (thisMonth < 11) {
      setThisMonth((currentMonth) => currentMonth + 1);
    }
    if (thisMonth >= 11) {
      setThisMonth(0);
      setThisYear(thisYear + 1);
    }
    populateDates();
  };

  const goToPreviousMonth = () => {
    setThisMonth(thisMonth - 1);
    if (thisMonth <= 0) {
      setThisMonth(11);
      setThisYear(thisYear - 1);
    }
    populateDates();
  };

  const formatDate = (date) => {
    let day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let year = date.getFullYear();

    return month + ' / ' + day + ' / ' + year;
  };

  const populateDates = () => {
    let amountOfDays = 31;

    let dateArray = [];
    for (let i = 1; i <= amountOfDays; i++) {
      dateArray.push(i);
    }

    setThisDay(dateArray);
  };

  useEffect(() => {
    setThisMonth(thisMonth);
    populateDates();
  }, [setThisDay]);

  let mappedDate = (day) => (
    <div key={day} className='day'>
      {day}
    </div>
  );

  return (
    <div className={props.className}>
      <div className='date-picker'>
        <div className='selected-date'>{formatDate(date)}</div>

        <div className='dates'>
          <div className='month'>
            <div onClick={goToPreviousMonth} className='arrows prev-month'>
              &lt;
            </div>

            <div className='mth'>{allMonths[thisMonth] + ' ' + thisYear}</div>
            <div onClick={goToNextMonth} className='arrows next-month'>
              &gt;
            </div>
          </div>

          <div className='days'>{thisDay.map(mappedDate)}</div>
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
    &:hover,
    &:active {
      background-color: #00ca85;
    }
  }
`;
