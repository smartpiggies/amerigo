import React, { Component } from "react"
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

//components
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

class PiggyToken extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts
    this.drizzle = context.drizzle

    this.handleExpand = this.handleExpand.bind(this)

    this.state = {
      panelOpen: false,
      dataKey: '0',
    }
  }

  componentDidMount() {
    this.contracts.SmartPiggies.methods['getDetails'].cacheCall(0, {from: this.props.accounts[0]})
  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {

  }

  groomID(id) {
    return id.slice(id.lastIndexOf("0")+1)
  }

  handleExpand() {
    this.setState({
      panelOpen: !this.state.panelOpen
    })
    console.log(this.props.SmartPiggies.getDetails)

    //this.contracts.SmartPiggies.methods.getDetails(0).call()
    /**
    this.setState({
      dataKey: this.contracts.SmartPiggies.methods['getDetails'].cacheCall(0, {from: this.props.accounts[0]})
    })
    **/
    /**
    this.contracts.SmartPiggies.methods.getDetails(0).call()
    .then(result => {
      let array = result
      console.log(array[0])
    })
    **/
  }

  render() {
    //console.log(this.state.piggyDetailMap)
    //let groomedId = this.groomID(this.props.piggy)
    //console.log(this.props.SmartPiggies.getDetails[this.state.dataKey])
    //console.log(this.state.dataKey)
    return (
      <div>
        <ExpansionPanel onChange={this.handleExpand}>
          <ExpansionPanelSummary>
              <Grid container spacing={0}>
                <Grid item xs={2}>
                  piggy: {this.groomID(this.props.piggy)}
                </Grid>

                <Grid item xs={2}>
                  Underlying: {this.props.asset}
                </Grid>

                <Grid item xs={2}>
                  Strike: {this.props.strike}
                </Grid>

                <Grid item xs={2}>
                  Expiry: {this.props.expiry}
                </Grid>

                <Grid item xs={2}>
                  URL: {this.props.url}
                </Grid>
              </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Hey! this is the piggy detail.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Divider />
      </div>
    )
  }
}

PiggyToken.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    SmartPiggies: state.contracts.SmartPiggies
  }
}

export default drizzleConnect(PiggyToken, mapStateToProps);
