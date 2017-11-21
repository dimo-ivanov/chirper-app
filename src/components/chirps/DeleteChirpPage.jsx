import { Component } from 'react'
import chirpActions from '../../actions/ChirpActions'

class DeleteChirpPage extends Component {
  componentWillMount () {
    const id = this.props.match.params.id

    chirpActions.delete(id)
    this.props.history.push('/users/me')
  }

  render () {
    return null
  }
}

export default DeleteChirpPage
