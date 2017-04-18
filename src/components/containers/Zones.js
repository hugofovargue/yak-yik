import React, { Component } from 'react'
import Zone from '../presentation/Zone'
import { APIManager } from '../../utils'
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
        zipCodes:''
      },
      list: []
    }
  }

  componentDidMount(){
    console.log('componentDidMount: Zones')
    APIManager.get('/api/zone', null, (err, response) =>{
      if(err) {
        alert('Error: '+err.message)
        return
      }

      console.log('Results: '+JSON.stringify(response.results))
      this.setState({
          list: response.results
      })
    })
  }

  addZone(){
    console.log('Add Zone: '+JSON.stringify(this.state.zone))

    let updatedZone = Object.assign({}, this.state.zone)
    updatedZone['zipCodes'] = updatedZone.zipCodes.split(', ')
    console.log('Add Zone: '+JSON.stringify(updatedZone))

    APIManager.post('/api/zone', updatedZone, (err, response) => {
      if(err){
        alert('Error: '+err.message)
        return
      }

      console.log('Zone created: '+JSON.stringify(response))
      let updatedList = Object.assign([], this.state.list)
      updatedList.push(response.result)
      /* using the response from a successful post, not just using updatedZone to render new zones */
      this.setState({
        list: updatedList
      })
    })
  }

  updateZone(event){
    let updatedZone = Object.assign({}, this.state.zone)
    updatedZone[event.target.id] = event.target.value
    console.log('updatedZone: '+JSON.stringify(updatedZone))

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
