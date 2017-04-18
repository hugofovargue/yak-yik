import React, { Component } from 'react'
import Comment from '../presentation/Comment'
import superagent from 'superagent'
import styles from './styles'

class Comments extends Component {
  constructor(){
    super()
    this.state = {
      comment: {
        username: '',
        body: '',
        timestamp: ''
      },
      list: []
    }
  }

  componentDidMount(){
    console.log('componentDidMount: Comments')
    superagent
    .get('/api/comment/')
    .query(null)
    .set('Accept', 'application/javascript')
    .end((err, response) => {
      if(err){
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

  submitComment(){
    console.log('submitComment' +JSON.stringify(this.state.comment))
    let updatedList = Object.assign([], this.state.list)
    updatedList.push(this.state.comment)

    this.setState({
      list: updatedList
    })
  }

  updateUsername(event){
    // this.state.comment['username'] = event.target.value <- Wrong!

    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment['username'] = event.target.value

    this.setState({
      comment: updatedComment
    })
    /*
      1. We created an object to copy the state.comment.
      2. Updated that object's username value with the current event target value
      3. Finally commiting the change to the state, and re-updating it
    */
  }

  updateBody(event){
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment['body'] = event.target.value

    this.setState({
      comment: updatedComment
    })
  }

  updateTimestamp(event){
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment['timestamp'] = event.target.value

    this.setState({
      comment: updatedComment
    })
  }

  render(){
    const listItems = this.state.list.map((comment, i) => {
      return(
        <li key={i}><Comment currentComment={comment} /></li>
      )
    })

    return(
      <div>
        <h2>Comments: Zone 1</h2>
        <div style={styles.comment.commentsBox}>
          <ul style={styles.comment.commentsList}>
            {listItems}
          </ul>

          <input onChange={this.updateUsername.bind(this)} className="form-control" type="text" placeholder="Username" /><br />
          <input onChange={this.updateBody.bind(this)} className="form-control" type="text" placeholder="Comment" /><br />
          <input onChange={this.updateTimestamp.bind(this)} className="form-control" type="text" placeholder="Timestamp" /><br />
          <button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>
        </div>
      </div>
    )
  }
}

export default Comments
