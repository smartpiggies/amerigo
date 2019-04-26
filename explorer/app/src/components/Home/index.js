import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import FetchData from "../FetchData"

import '../../App.js'

const appBar = {
  backgroundColor: 'default',
  //height: 50,
  display: 'block',
  padding: 10,
}

// current network client is connected to
let activeNetwork

class Home extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts
    this.drizzle = context.drizzle

    this.state = {
      spContractAddress: '',
      activeAccount: '',
      blockNumber: 0,
      network: 0,

      //datakeys
      dataKeyGetOwnedPiggies: '',
    }

  }

  componentDidMount() {
    // If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
    if (this.props.drizzleStatus.initialized) {

      // Declare this call to be cached and synchronized. We'll receive the store key for recall.
      let globalDataKeyGetOwnedPiggies = this.contracts.SmartPiggies.methods['getOwnedPiggies'].cacheCall(this.props.accounts[0])

      this.setState({
        dataKeyGetOwnedPiggies: globalDataKeyGetOwnedPiggies,
        //dataKeyGetDetails: globalDataKeyGetDetails,
        network: this.drizzle.web3.givenProvider.networkVersion
      })

      switch (this.state.network) {
        case '1':
          activeNetwork = 'Ethereum'
          break
        case '3':
          activeNetwork = 'Ropsten'
          break
        case '4':
          activeNetwork = 'Rinkeby'
          break
        case '5':
          activeNetwork = 'Goerli'
          break
        default:
          activeNetwork = 'unknown'
      }

      //set block number on load
      this.drizzle.web3.eth.getBlockNumber()
      .then(result => {
        this.setState({
          blockNumber: result
        })
      })
    }

    this.setState({
      spContractAddress: this.contracts.SmartPiggies.address,
      activeAccount: this.props.accounts[0]
    })

    //update current block number every 10 seconds
    this.interval = setInterval(() => {
      this.drizzle.web3.eth.getBlockNumber()
      .then(result => {
        this.setState({
          blockNumber: result
        })
      })
    }, 10000)
  }

  componentDidUpdate(prevProps, prevState) {

    //Update network
    if (this.state.network !== prevState.network) {
      switch (this.state.network) {
        case '1':
          activeNetwork = 'Ethereum'
          break
        case '3':
          activeNetwork = 'Ropsten'
          break
        case '4':
          activeNetwork = 'Rinkeby'
          break
        case '5':
          activeNetwork = 'Goerli'
          break
        default:
          activeNetwork = 'unknown'
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  groomAddress(address) {
    let groomed
    if (address !== '0x0000000000000000000000000000000000000000') {
      groomed = address.slice(0, 6)
      groomed = groomed + "...." + address.slice(-4)
    }
    return groomed
  }

  render() {
    //console.log(this.state.piggyDetailMap)
    let groomedAddress = this.groomAddress(this.state.activeAccount)

    return (
      <div className='App'>
        <AppBar
          style={appBar}
          color="default"
        >
          <table width="100%">
            <tbody>
              <tr>
                <td>Contract: {this.state.spContractAddress}</td>
                <td text-align="right">Block: {this.state.blockNumber}</td>
              </tr>
              <tr>
                <td>User: {groomedAddress}</td>
                <td text-align="right">Network: {activeNetwork}</td>
              </tr>
            </tbody>
          </table>
        </AppBar>

        <div className='Main'>
          <FetchData block={this.state.blockNumber} />
        </div>
      </div>
    )
  }
}

Home.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    SmartPiggies: state.contracts.SmartPiggies
  }
}

export default drizzleConnect(Home, mapStateToProps);
