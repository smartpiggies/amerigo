import React, { Component } from "react"

//components
import PiggyToken from "../PiggyToken"

const endpoint = 'https://api.goerli.aleth.io/v1/contracts/0xd847904c84532950bdbe7ed8dd2e8c9ce0a3716d/logEntries'

class FetchData extends Component {
  constructor(props, context) {
    super(props)

    this.state = {
      piggies: [],
    }

  }

  componentDidMount() {
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
          let address = result.data.attributes.msgPayload.inputs[2].value.slice(24)
          let oracleEndpoint = 'https://api.goerli.aleth.io/v1/contracts/' + address

          fetch(oracleEndpoint)
          .then(result => {
            return result.json()
          })
          .then(result => {
            //let formatHex = web3.utils.hexToAscii(result.data.attributes.constructorArgs[10])
            //console.log(formatHex)
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
            oracle: "0x0000000000000000000000000000000000000000",
            underlying: "none",
            url: "none"
          }
        )
      })
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
    let record
    if (this.state.piggies[0] !== undefined) {
      //console.log(this.state.piggies[0].index)
      record = this.state.piggies[0].id
    }

    return (
      <div>
      {record}
      {/** {this.state.piggies[0].index} **/}
      </div>
    )
  }
}


export default FetchData;
