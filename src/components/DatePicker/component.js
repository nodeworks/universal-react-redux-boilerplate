/* @flow */
import React, { Component } from 'react'
import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'

type Props = {
  className: ?string
}

type State = {
  startDate: any,
  endDate: any,
  focusedInput: any
}

class DatePicker extends Component<Props, State> {
  props: Props
  state: State

  constructor(props: Props) {
    super(props)

    let focusedInput = null
    if (props.autoFocus) {
      focusedInput = 'startDate'
    }
    else if (props.autoFocusEndDate) {
      focusedInput = 'endDate'
    }

    this.state = {
      startDate: moment(),
      endDate: moment().add(1, 'days'),
      focusedInput
    }
  }

  onDatesChange = ({ startDate, endDate }: any) => {
    this.setState({ startDate, endDate })
  }

  onFocusChange = (focusedInput: string) => {
    this.setState({ focusedInput })
  }

  render() {
    return (
      <div className={this.props.className ? this.props.className : ''}>
        <DateRangePicker
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={this.state.focusedInput}
          startDateId='startDate'
          endDateId='endDate'
          displayFormat='MMM. D, YYYY'
          showClearDates
          showDefaultInputIcon
          noBorder
        />
      </div>
    )
  }
}

export default DatePicker
