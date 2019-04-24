import React, { Component } from "react"

//components
import PiggyToken from "../PiggyToken"

const endpoint = 'https://api.goerli.aleth.io/v1/contracts/0xd847904c84532950bdbe7ed8dd2e8c9ce0a3716d/logEntries'

class FetchData extends Component {
  constructor(props, context) {
    super(props)

    this.hex2a = this.hex2a.bind(this)
    this.state = {
      piggies: [],
    }

  }

  hex2a(hexx) {
      var hex = hexx.toString();//force conversion
      var str = '';
      for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
          str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      return str;
  }

  componentDidMount() {
    let address = "0"
    let underlying = "none"
    fetch(endpoint)
    .then(result => {
      return result.json()
    })
    .then(jsonResult => {
      let logData = jsonResult.data.map((item, i) => {
        fetch(item.relationships.transaction.links.related)
        .then(result => {
          return result.json()
        })
        .then(result => {
          address = result.data.attributes.msgPayload.inputs[2].value.slice(24)
          let oracleEndpoint = 'https://api.goerli.aleth.io/v1/contracts/' + address

          return fetch(oracleEndpoint)
          .then(result => {
            return result.json()
          })
          .then(result => {
            console.log(this.hex2a(result.data.attributes.constructorArgs[10]))
            return underlying = this.hex2a(result.data.attributes.constructorArgs[10])
          })
        })
        return(
          {
            index: i,
            id: item.id,
            topic: item.attributes.eventDecoded.topic0,
            writer: item.attributes.eventDecoded.inputs[0].value,
            piggyId: item.attributes.eventDecoded.inputs[1].value,
            strike: item.attributes.eventDecoded.inputs[2].value,
            expiry: item.attributes.eventDecoded.inputs[3].value,
            rfp: item.attributes.eventDecoded.inputs[4].value,
            txUrl: item.relationships.transaction.links.related,
            oracle: address,
            underlying: underlying,
            url: "none"
          }
        )

      })
      console.log(logData)
      this.setState({
        piggies: logData
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {

  }

  render() {
    //console.log(this.state.piggies[0])
    let record, piggy, underlying, strike, expiry
    if (this.state.piggies[0] !== undefined) {
      //console.log(this.state.piggies[0].index)
      record = this.state.piggies[0].id
      piggy = this.state.piggies[0].piggyId
      underlying = "none"
      strike = parseInt(this.state.piggies[0].strike, 16)
      expiry = parseInt(this.state.piggies[0].expiry, 16)
    }


    return (
      <div>
      <ul>
        <li>
            {record}
        </li>
        <li>
          ID: {piggy}
        </li>
        <li>
          Underlying: {underlying}
        </li>
        <li>
          Strike: {strike}
        </li>
        <li>
          Expiration: {expiry}
        </li>
      </ul>
      {/** {this.state.piggies[0].index} **/}
      </div>
    )
  }
}


export default FetchData;
