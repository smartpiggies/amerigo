import React, { Component } from "react"

import FetchData from "../FetchData"

class Home extends Component {
  constructor(props, context) {
    super(props)

    this.state = {
    }

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
        Home App
        <FetchData />
      </div>
    )
  }
}


export default Home;
