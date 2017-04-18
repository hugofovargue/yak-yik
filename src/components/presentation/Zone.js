import React, { Component } from 'react'
import styles from './styles'

class Zone extends Component {
  /*
    zoneStyle declared on this line wouldn't work, as the const
    would be outside of the function (render) scope.
  */
  render(){
    const zoneStyle = styles.zone
    const zipCode = this.props.currentZone.zipCodes[0]
    /*
      ln11: This line is breaking something when adding a zone.
      something to do with the zipCode array above
    */

    return(
      <div style={zoneStyle.container}>
        <h2 style={zoneStyle.header}>
          <a style={zoneStyle.title} href="#">{this.props.currentZone.name}</a>
        </h2>
        <span className="detail">{zipCode}</span><br />
        <span className="detail">{this.props.currentZone.numComments} comments</span>
      </div>
    )
  }
}

export default Zone
