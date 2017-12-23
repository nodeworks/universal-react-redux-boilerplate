/* @flow */
import React, { Component } from 'react'
import { Chart } from 'react-google-charts'
import { withApollo } from 'react-apollo'
import { withFormatSwitcher } from '../Switchers'
import Loader from '../../Loader'

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
  chartData: [],
  id: string,
  live: boolean, // eslint-disable-line
  title: string, // eslint-disable-line
  chartFormatOptions: Array<Object>, // eslint-disable-line
  formatChanger: boolean, // eslint-disable-line
  hasTooltip: boolean, // eslint-disable-line
  tooltipTitle: string, // eslint-disable-line
  tooltipText: string, // eslint-disable-line
  tooltipTarget: string, // eslint-disable-line
  client: any, // eslint-disable-line
  data: Array<Object>, // eslint-disable-line
  isLoading: boolean,
  format: string,
  noDataText: string
}

type State = {}

class BarChart extends Component<Props, State> {
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
              chartType='BarChart'
              data={chartData}
              options={{
                annotations: {
                  alwaysOutside: true
                },
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
                  width: '65%'
                },
                hAxis: {
                  textPosition: 'none',
                  color: '#777777',
                  baselineColor: '#dddddd',
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
                  gridlines: {
                    color: 'transparent'
                  },
                  textStyle: {
                    color: '#777777'
                  }
                },
                backgroundColor: '#ffffff',
                colors: ['#9e682a']
              }}
              graph_id={this.props.id}
              width='100%'
              height='400px'
              loader={<Loader/>}
            />
          )
        }
      </div>
    )
  }
}

export default withApollo(withFormatSwitcher(BarChart))
