import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'

import '../../App.js'

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
    console.log(this.context)
    return (
      <div className='App'>
        Home App
        <FetchData />
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

export default drizzleConnect(Home, mapStateToProps);
