import React, { Component } from "react"

//components
import PiggyToken from "../PiggyToken"

const endpoint = 'https://api.goerli.aleth.io/v1/contracts/0xd847904c84532950bdbe7ed8dd2e8c9ce0a3716d/logEntries'

class FetchData extends Component {
  constructor(props, context) {
    super(props)

    this.hex2a = this.hex2a.bind(this)
    this.fetchPiggies = this.fetchPiggies.bind(this)

    this.state = {
      piggies: [],
      oracles: [],
      data: []
    }

  }

  hex2a(hexx) {
      var hex = hexx.toString();//force conversion
      var str = '';
      for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
          str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      return str;
  }

  fetchPiggies() {
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

          fetch(oracleEndpoint)
          .then(result => {
            return result.json()
          })
          .then(result => {
            let array = this.state.oracles
            array.push(
              {
                address: address,
                underlying: this.hex2a(result.data.attributes.constructorArgs[10]),
                url: this.hex2a(result.data.attributes.constructorArgs[8]),
              }
            )
            this.setState({
              oracles: array
            })
          })

        })

          return(
            {
              index: i,
              id: item.id,
              topic: item.attributes.eventDecoded.topic0,
              writer: item.attributes.eventDecoded.inputs[0].value,
              piggyId: item.attributes.eventDecoded.inputs[1].value,
              strike: parseInt(item.attributes.eventDecoded.inputs[2].value, 16),
              expiry: parseInt(item.attributes.eventDecoded.inputs[3].value, 16),
              rfp: item.attributes.eventDecoded.inputs[4].value,
              txUrl: item.relationships.transaction.links.related,
              oracle: address,
              underlying: underlying,
              url: "none"
            }
          )

        })
        this.setState({
          piggies: logData
        })
      })
  }

  componentDidMount() {
    this.fetchPiggies()
  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {

  }

  render() {
    //console.log(this.state.oracles)
    //console.log(this.state.piggies[0])
    let tokens, filledUnderlying, filledURL

    if (this.state.piggies[0] !== undefined && this.state.oracles[0] !== undefined) {
      tokens = this.state.piggies.map((item) => {
        if (this.state.oracles[item.index] !== undefined) {
          filledUnderlying = this.state.oracles[item.index].underlying
          filledURL = this.state.oracles[item.index].url
        }
        return <PiggyToken
                  index={item.index}
                  id={item.id}
                  piggy={item.piggyId}
                  asset={filledUnderlying}
                  strike={item.strike}
                  expiry={item.expiry}
                  url={filledURL}
              />
      })

    }
    return (
      <div>
      {tokens}
      </div>
    )
  }
}


export default FetchData;
