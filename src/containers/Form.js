import React from 'react'

/* IPFS and crypto stuff */
import { publicEncrypt, randomFillSync } from 'crypto'
import IPFS from 'ipfs'
import CryptoStream from 'crypto-stream'
import TarStream from 'tar-stream'
import Combine from 'stream-combiner2'
import nanoid from 'nanoid'

/* React Components */
import { Container } from 'reactstrap'
import { withRouteData } from 'react-static'
import { ReportForm } from '../components/Form'

const PUBKEY = `-----BEGIN RSA PUBLIC KEY-----\n\
MIIBCgKCAQEAs7Q/UCxaUbsJ6GqCBJ1qU0SMzbX1VyJeVs9rzhQyx6tMXo97QBVE\n\
+a615klHCct3pA5K2D9emGjR1fQ3FZdHTFuJMvGqpQb32DhRy00KlimU6mtlxeK4\n\
ZiQDwYapMUMcjngBNiROLL7JlNXcqPoO4wyu2jk+1y1QLQfxeFIPPXn/cRoooD7P\n\
DUnFty32vc2lCRqujd8FKUr2YBu7EKlSzfczlQU5k433YM0iOzL4ScVlD46E8HmO\n\
zuI1NtPq5ytnx6S/m7ZZ/LxQlfaAy7njre6+eKjT3hoDm310HVvF7Y/wkiFeQA8U\n\
VJElD1BzTjuUWkkdZohAgM7hTDVOSrjsYQIDAQAB\n\
-----END RSA PUBLIC KEY-----`

class UploadForm extends React.PureComponent {
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


  callbacks = {
    validate: ({titulo, conteudo}) => {
      console.error('validate')
      const errors = {};
      if (!titulo) errors.titulo = 'preencha un titulo'
      if (!conteudo) errors.conteudo = 'nos conte o que esta denunciando'
      return errors;
    },
    onSubmit: (values, {setSubmitting}) => {
      const { ipfs } = this.state
      if (! ipfs) return alert(`Error: IPFS not ready !`)

      const jsonValues = JSON.stringify(values, null, 2)
      const key = Buffer.alloc(128)
      randomFillSync(key)

      const enckey = publicEncrypt(PUBKEY, key)

      const dirname = `/${nanoid()}`
      const pack = TarStream.pack()
      pack.entry ({ name: `${dirname}/values.json`}, jsonValues)
      pack.finalize()
      // files.map(f => this.archiver.append(f, { name: f.name })

      const encrypter = CryptoStream.encrypt(key)
      const pipeline = Combine(pack, encrypter)

      setSubmitting(false);

      return Promise.all([
        ipfs.files.write(`${dirname}.tar.crypt`, pipeline, {
          create: true,
          parents: true
        }),
        ipfs.files.write(`${dirname}.key`, enckey, {
          create: true,
          parents: true
        })
      ]).catch(e => console.error('error in IPFS pipeline', e))
    }
  }

  render () {
    const { content: { form } } = this.props
    const { ipfs } = this.state

    return (
      <Container>
          {!ipfs && `Initializing IPFS...`}
          <ReportForm {...form} {...this.callbacks} />
      </Container>)
  }
}

export default withRouteData(UploadForm)
