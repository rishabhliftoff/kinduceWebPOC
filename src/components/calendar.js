import React, { Component } from 'react';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates,
} from 'react-infinite-calendar';
import moment from 'moment';
import 'react-infinite-calendar/styles.css';

class MultiSelectCalendar extends Component {
  render() {
    return (
      <InfiniteCalendar
          className="calendar"
          width={'100%'}
          height={250}
          Component={withMultipleDates(Calendar)}
          displayOptions={{
            showHeader: false,
          }}
          min={new Date()}
          max={moment().add(6, 'M').toDate()}
          minDate={moment().add(7, 'd').toDate()}
          maxDate={moment().add(6, 'M').toDate()}
          interpolateSelection={defaultMultipleDateInterpolation}
          selected={[false]}
      />
    );
  }
}

export default MultiSelectCalendar;
