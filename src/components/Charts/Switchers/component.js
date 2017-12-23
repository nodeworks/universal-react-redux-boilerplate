/* @flow */
import React, { Component } from 'react'
import ToolTip from '../../../components/ToolTip'

type Props = {
  title: string,
  active: boolean,
  options: []
}

type State = {
  format: string
}

type HOCProps = {
  live: boolean,
  hasTooltip: boolean,
  formatChanger: boolean,
  format: string,
  chartFormatOptions: [],
  client: any,
  title: string,
  tooltipTarget: string,
  tooltipText: string,
  tooltipTitle: string
}

export const withFormatSwitcher = (WrappedItem: any) =>
  class formatSwitcherHOC extends Component<HOCProps, State> {
    static defaultProps: HOCProps = {
      live: false,
      hasTooltip: false,
      formatChanger: false,
      chartFormatOptions: [],
      format: '',
      client: '',
      title: '',
      tooltipTarget: '',
      tooltipText: '',
      tooltipTitle: ''
    }

    constructor(props: HOCProps) {
      super(props)

      this.state = {
        format: props.format
      }
    }

    onChartFormatChange = (type: string) => {
      if (this.state.format !== type) {
        this.setState({
          format: type
        })
      }
    }

    render() {
      const chartFormatOptions = this.props.chartFormatOptions.map(item => ({
        ...item,
        onClick: (type) => this.onChartFormatChange(type)
      }))

      const optionsList = chartFormatOptions.map(item => (
        <button
          key={item.key}
          onClick={() => item.onClick(item.key, item.query)}
          type='button'
          className={`btn btn-primary ${this.state.format === item.key ? 'active' : ''}`}
        >
          {item.label}
        </button>
      ))

      const newProps = Object.assign(
        {},
        { ...this.props },
        { format: this.state.format }
      )

      return (
        <div>
          {this.props.formatChanger
            ? (
              <div className='mb-5'>
                <div className='chart-wrap pt-3 text-center'>
                  <h2>{this.props.title} { this.props.live && <span className='live-span'>Live</span> } {this.props.hasTooltip && <i id={this.props.tooltipTarget} className='fa fa-info-circle' />}</h2>
                  {this.props.hasTooltip
                    && <ToolTip
                      target={this.props.tooltipTarget}
                      title={this.props.tooltipTitle}
                      text={this.props.tooltipText}
                    />
                  }
                  <div className='btn-group switcher-buttons' role='group' aria-label={this.props.title}>
                    {optionsList}
                  </div>
                  <WrappedItem {...newProps} />
                </div>
                <span className='last-updated-text pr-3 pt-1 d-block text-right'>Last updated 7 minutes ago</span>
              </div>
            )

            : (
              <div className='mb-5'>
                <div className='chart-wrap pt-3 text-center'>
                  <h2>{this.props.title} {this.props.hasTooltip && <i id={this.props.tooltipTarget} className='fa fa-info-circle' />} { this.props.live && <span className='live-span'>Live</span> }</h2>
                  {this.props.hasTooltip
                    && <ToolTip
                      target={this.props.tooltipTarget}
                      title={this.props.tooltipTitle}
                      text={this.props.tooltipText}
                    />
                  }
                  <WrappedItem {...newProps} />
                </div>
              </div>
            )
          }
        </div>
      )
    }
  }

const Switcher = ({ title, active, options = [] }: Props) => {
  const optionsList = options.map(item => (
    <button
      key={item.key}
      onClick={() => item.onClick(item.key, item.query)}
      type='button'
      className={`btn btn-primary ${active === item.key ? 'active' : ''}`}
    >
      {item.label}
    </button>
  ))

  return (
    <div className='btn-group switcher-buttons no-absolute col' role='group' aria-label={title}>
      {optionsList}
    </div>
  )
}

export default Switcher
