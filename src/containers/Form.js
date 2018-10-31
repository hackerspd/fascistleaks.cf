import React from 'react'
import { Container } from 'reactstrap'
import { withRouteData } from 'react-static'
import { ReportForm } from '../components/Form'

class UploadForm extends React.Component {
  constructor(props, state) {
    super(props, state)
    this.state = {
      ipfs: null
    }

    const ipfs = new IPFS({
      repo: `ipfs-hpd`
    })

    ipfs.on('ready', () => this.setState(state => ({
      ipfs
    })))
  }
  handleSubmit = (values, {setSubmitting}) => {

    console.log(values);
    //Make API calls here

    setTimeout(() => {
      setSubmitting(false);
      alert(`Submitted Successfully ->  ${JSON.stringify(values, null, 2)}`)
    }, 2000);
  }

  render () {
    const { content: { form } } = this.props
    const { ipfs } = this.state

    return (
      <Container>
          {!ipfs && `Initializing IPFS...`}
          <ReportForm {...form} onSubmit={this.handleSubmit}/>
      </Container>)
  }
}

export default withRouteData(UploadForm)
