import React, { Component } from "react"
import { drizzleConnect } from 'drizzle-react'

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

    this.handleExpand = this.handleExpand.bind(this)

    this.state = {
      panelOpen: false
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

  handleExpand() {
    this.setState({
      panelOpen: !this.state.panelOpen
    })
    console.log(this.props.SmartPiggies)
  }

  render() {
    //console.log(this.state.piggyDetailMap)
    //let groomedId = this.groomID(this.props.piggy)

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

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    SmartPiggies: state.contracts.SmartPiggies
  }
}

export default drizzleConnect(PiggyToken, mapStateToProps);
