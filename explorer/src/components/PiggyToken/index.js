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

  render() {
    //console.log(this.state.piggyDetailMap)

    return (
      <div>
        <ul>
          <li key={this.props.idx}>
            {this.props.id}
          </li>
        </ul>
      </div>
    )
  }
}


export default PiggyToken;
