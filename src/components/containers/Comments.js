import React, { Component } from 'react'
import Comment from '../presentation/Comment'
import { APIManager } from '../../utils'
import styles from './styles'

class Comments extends Component {
  constructor(){
    super()
    this.state = {
      comment: {
        username: '',
        body: ''
      },
      list: []
    }
  }

  componentDidMount(){
    console.log('componentDidMount: Comments')
    APIManager.get('/api/comments', null, (err, response) =>{
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

  submitComment(){
    let updatedComment = Object.assign({}, this.state.comment)
    // Fomatting and subsequent error handling of comments would go here
    console.log('Updated Comment: '+JSON.stringify(updatedComment))

    APIManager.post('/api/comments', updatedComment, (err, response) =>{
        if(err){
          alert('Error: '+err.message)
          return
        }

        console.log('Comment created: '+JSON.stringify(response))
        let updatedList = Object.assign([], this.state.list)
        updatedList.push(response.result)
        this.setState({
          list: updatedList
        })
    })

    // console.log('submitComment' +JSON.stringify(this.state.comment))
    // let updatedList = Object.assign([], this.state.list)
    // updatedList.push(this.state.comment)
    //
    // this.setState({
    //   list: updatedList
    // })
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
          <button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>
        </div>
      </div>
    )
  }
}

export default Comments
