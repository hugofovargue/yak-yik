import React, { Component } from 'react'
import Zone from '../presentation/Zone'
import superagent from 'superagent'
import styles from './styles'


class Zones extends Component {
  /*
    This is the first operation to run in the component class
    It is the inialiser of the class. It will run regardless.
    By calling super() we get to dictate what happens.
  */
  constructor(){
    super()
    this.state = {
      zone: {
        name:'',
        zipCodes:[]
      },
      list: []
    }
  }

  componentDidMount(){
    console.log('componentDidMount: Zones')

    superagent
    .get('/api/zone')   // The API get request
    .query(null)        // This is where the parameters for the request would be made, null if nothing
    .set('Accept', 'application/json')  // Tells superagent what kind of file to accept
    .end((err, response) => {    //
      if(err) {
        alert('Error: '+err)
        return
      }

      console.log(JSON.stringify(response.body))
      let results = response.body.results
      this.setState({
          list: results
      })
    })
  }

  addZone(){
    console.log('Add Zone: '+JSON.stringify(this.state.zone))
    let updatedList = Object.assign([], this.state.list)
    updatedList.push(this.state.zone)

    this.setState({
      list: updatedList
    })
  }

  updateZone(event){

    let updatedZone = Object.assign({}, this.state.zone)
    updatedZone[event.target.id] = event.target.value

    this.setState({
      zone: updatedZone
      /*
        In this instance, because the DOM isn't being changed,
        there's no re-rendering. It's simply saving the state.
      */
    })
  }

  render(){
    {/*
      Here we loop through the state list, and
      for each element create an <li> tag
    */}
    const listItems = this.state.list.map((zone, i) => {
      return (
          <li key={i}><Zone currentZone={zone} /></li>
          /*
            Zone is referncing the child component.
            currentZone is the name of the properties.
            It is an object of properties.
          */
      )
    })

    return (
      <div>
        <ol style={styles.zone.zoneList}>
          {listItems}
        </ol>

        <input id="name" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Zone Name" /><br />
        <input id="zipCodes" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Zipcode(s)" /><br />
        <button onClick={this.addZone.bind(this)} className="btn btn-danger">Add Zone</button>
      </div>
    )
  }
}

export default Zones
