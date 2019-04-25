import React, { Component } from "react"

class PiggyToken extends Component {
  constructor(props, context) {
    super(props)
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

  render() {
    //console.log(this.state.piggyDetailMap)
    //let groomedId = this.groomID(this.props.piggy)

    return (
      <div>
        <ul>
          <li key={this.props.index}>
            ID: {this.groomID(this.props.piggy)} |
            Underlying: {this.props.asset} |
            Strike: {this.props.strike} |
            Expiry: {this.props.expiry} |
            URL: {this.props.url}
          </li>
        </ul>
      </div>
    )
  }
}


export default PiggyToken;
