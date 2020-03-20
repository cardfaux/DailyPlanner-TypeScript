import React from 'react';

import Calendar from '../../Components/Calendar/Calendar';
import Button from '../../Shared/Components/FormElements/Button/Button';

const Events: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <div style={{ margin: 0, padding: 0 }}>
        <h1 style={{ margin: 0, padding: 0 }}>Go To Events Log</h1>
      </div>
      <Calendar />
      <div>
        <Button to='/events/logs'>Go To Event Logs</Button>
      </div>
    </React.Fragment>
  );
};

export default Events;
