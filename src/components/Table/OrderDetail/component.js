/* @flow */
import React, { Component } from 'react'
import { Collapse, Button, CardBody, Card } from 'reactstrap'
import numeral from 'numeral'
import { withApollo } from 'react-apollo'
import {toastr} from 'react-redux-toastr'
import Loader from '../../Loader'
import Modal from '../../Modal'
import EmailQuery from '../../../graphql/queries/email.gql'

type Props = {
  identifier: string,
  item: any,
  client: Object
}

type State = {}

class OrderDetail extends Component<Props, State> {
  props: Props
  state: State

  resendReceipt = (order: Object) => {
    this.props.client.query({
      query: EmailQuery,
      variables: {
        type: 'receipt',
        id: order.mail
      },
      fetchPolicy: 'network-only',
      ssr: false
    })
    .then((res) => {
      if (res.data.email.result) {
        toastr.success('Success!', `A receipt has been sent to ${order.mail}`)
      } else {
        toastr.error('Oops!', `We had trouble sending out the email. Please contact us if you have any further trouble.`)
      }
    })
  }

  render() {
    const { item } = this.props

    return (
      <div>
        {item
          ? (
            <div className='row'>
              <div className='collapse col-9 offset-2 mt-3' id={`collapse${this.props.identifier}`}>
                <div className='card card-body ml-4 ml-md-4 ml-lg-4 ml-xl-5 mb-4'>
                  <div className='row table-contact-info mb-3'>
                    <div className='col-4'>
                      <p>Email: {item.mail}</p>
                    </div>
                    <div className='col-4 offset-4'>
                      <p>Phone: {item.phone_number}</p>
                    </div>
                  </div>
                  <div className='row table-items-header mb-3'>
                    <div className='col-4'>
                      <p>Item</p>
                    </div>
                    <div className='col-4'>
                      <p>Count</p>
                    </div>
                    <div className='col-4'>
                      <p>Amount</p>
                    </div>
                  </div>
                  {item.line_items.map(line_item => (
                    <div key={line_item.id} className='row table-item align-items-center mb-3'>
                      <div className='col-4'>
                        <img className='img-fluid img-thumbnail product-preview-thumb d-inline-flex' src={`${line_item.product.image.uri}`} />
                        <p className='d-inline-flex ml-3 mb-0'>{line_item.product.name}</p>
                      </div>
                      <div className='col-4'>
                        <p className='mb-0'>{numeral(line_item.quantity).format('0,0')}</p>
                      </div>
                      <div className='col-4'>
                        <p className='mb-0'>{numeral(line_item.total_price).format('$0,0.00')}</p>
                      </div>
                    </div>
                  ))}
                  <div className='row table-total'>
                    <div className='col-4'>
                      <p>Total</p>
                    </div>
                    <div className='col-4 offset-4'>
                      <p>{numeral(item.total_price).format('$0,0.00')}</p>
                    </div>
                  </div>
                  <div className='row table-actions'>
                    <div className='col-6 text-right'>
                      <button className='btn btn-primary button-green'>Edit order</button>
                    </div>
                    <div className='col-6'>
                      <Modal
                        className='resend-receipt-modal'
                        modalTitle='Resend Receipt'
                        buttonLabel={(<span><i className="fa fa-repeat" aria-hidden="true" /> Resend receipt</span>)}
                        buttonClass='btn btn-primary button-brown'
                        actionLabel='Send'
                        actionCallback={this.resendReceipt}
                        actionParams={item}
                      >
                        Are you sure you want to send a receipt to {item.mail}?
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
          : (
            <div className='row'>
              <div className='collapse col-9 offset-2 mt-3' id={`collapse${this.props.identifier}`}>
                <div className='card card-body ml-4 ml-md-4 ml-lg-4 ml-xl-5 mb-4'>
                  <Loader fixed={false} />
                </div>
              </div>
            </div>
          )
      }
      </div>
    )
  }
}

export default withApollo(OrderDetail)
