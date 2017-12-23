/* @flow */
import React, { Component } from 'react'
import { Chart } from 'react-google-charts'
import { withApollo } from 'react-apollo'
import Loader from '../../Loader'
import { withFormatSwitcher } from '../Switchers'

const DetermineLoading = ({ isLoading, chartData, noDataText }) => {
  if (isLoading) {
    return (
      <Loader fixed={false} />
    )
  }

  return (
    <h3 className='p-5 font-italic'>{noDataText}</h3>
  )
}

type Props = {
  id: string,
  title: string, // eslint-disable-line
  live: boolean, // eslint-disable-line
  format: string,
  formatChanger: boolean, // eslint-disable-line
  hasTooltip: boolean, // eslint-disable-line
  tooltipTitle: string, // eslint-disable-line
  tooltipText: string, // eslint-disable-line
  tooltipTarget: string, // eslint-disable-line
  chartFormatOptions: Array<Object>, // eslint-disable-line
  client: any, // eslint-disable-line
  chartData: [],
  data: Array<Object>, // eslint-disable-line
  isLoading: boolean,
  noDataText: string
}

type State = {}

class LineChart extends Component<Props, State> {
  props: Props
  state: State

  render() {
    let chartData
    if (this.props.formatChanger) {
      chartData = this.props.chartData[this.props.format]
    }

    return (
      <div>
        {this.props.isLoading || chartData.length <= 1
          ? (<DetermineLoading noDataText={this.props.noDataText} isLoading={this.props.isLoading} chartData={chartData} />)
          : (
            <Chart
              chartType='LineChart'
              data={chartData}
              options={{
                pointSize: 5,
                titleTextStyle: {
                  color: '#777777'
                },
                animation: {
                  duration: 1000,
                  easing: 'out',
                  startup: true
                },
                legend: {
                  position: 'none'
                },
                chartArea: {
                  width: '90%'
                },
                hAxis: {
                  color: '#777777',
                  baselineColor: '#dddddd',
                  format: 'MMM d, y',
                  gridlines: {
                    color: 'transparent'
                  },
                  textStyle: {
                    color: '#777777'
                  }
                },
                vAxis: {
                  color: '#777777',
                  baselineColor: '#dddddd',
                  format: this.props.format,
                  gridlines: {
                    color: 'transparent'
                  },
                  textStyle: {
                    color: '#777777'
                  }
                },
                backgroundColor: '#ffffff',
                colors: ['#f1b930']
              }}
              graph_id={this.props.id}
              width='100%'
              height='400px'
              loader={<Loader fixed={false} />}
            />
          )
        }
      </div>
    )
  }
}

export default withApollo(withFormatSwitcher(LineChart))
