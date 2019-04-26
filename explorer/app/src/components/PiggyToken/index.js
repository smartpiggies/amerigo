import React, { Component } from "react"
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

//components
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import AddressItems from "../ListItems/AddressItems"
import UintItems from "../ListItems/UintItems"
import BoolItems from "../ListItems/BoolItems"

let addressValues, uintValues, boolValues

class PiggyToken extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts
    this.drizzle = context.drizzle

    //this.handleExpand = this.handleExpand.bind(this)

    this.state = {
      dataKey: '0',
    }
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {

  }

  groomID(id) {
    return id.slice(id.lastIndexOf("0")+1)
  }

  handleExpand = (evt, expanded) => {

    if (expanded) {
      this.contracts.SmartPiggies.methods.getDetails(this.groomID(this.props.piggy)).call()
      .then(result => {
        if (result.length === 3) {
          addressValues = <AddressItems item={result[0]} />
          uintValues = <UintItems item={result[1]} />
          boolValues = <BoolItems item={result[2]} />
        }
        //console.log(result[0])
        //console.log(result[1])
        //console.log(result[2])
      })
    }

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
              {addressValues}
              {uintValues}
              {boolValues}
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
