import React from 'react'
import { withRouteData } from 'react-static'
import { Container, Alert, Button,
         Form, FormGroup, FormText,
         Label, Input,
         Row, Col } from 'reactstrap'
import Markdown from 'react-markdown'
//
import Post from './Post'
import '../css/form.css'

const Intro = ({content, data: { title }}) => (
  <FormGroup>
      <h1>{title}</h1>
      <Markdown source={content}/>
  </FormGroup>
)

const CategoriasForm = () => (
  <FormGroup>
      <Label for="checksCategoria">Categorias</Label>
      <Container>
          <Row>
	      <Col>
                  <FormGroup>
                      <Label check>
		          <Input type="radio" name="categorias" id="checksCategoria1" />
                          Fake News
                      </Label>
                  </FormGroup>
                  <FormGroup>
                      <Label check>
		          <Input type="radio" name="categorias" id="checksCategoria1" />
                          Machismo
                      </Label>
                  </FormGroup>
                  <FormGroup>
                      <Label check>
		          <Input type="radio" name="categorias" id="checksCategoria1" />
                          Racismo
                      </Label>
                  </FormGroup>
                  <FormGroup>
                      <Label check>
		          <Input type="radio" name="categorias" id="checksCategoria1" />
                          Homofobia
                      </Label>
                  </FormGroup>
              </Col>
              <Col>
                  <FormGroup>
                      <Label check>
		          <input type="radio" name="categorias" value="violencia"  id="checksCategoria1" />
                          Violência
                      </Label>
                  </FormGroup>
                  <FormGroup>
                      <Label check>
		          <input type="radio" name="categorias" value="xenofobia"  id="checksCategoria1" />
                          Xenofobia
                      </Label>
                  </FormGroup>
                  <FormGroup>
                      <Label check>
		          <input type="radio" name="categorias" value="etnofobia"  id="checksCategoria1" />
                          Etnofobia
                      </Label>
                  </FormGroup>
                  <FormGroup>
                      <Label check>
		          <input type="radio" name="categorias" value="outros"  id="checksCategoria1" />
                          Outros
                      </Label>
                  </FormGroup>
              </Col>
          </Row>
      </Container>
  </FormGroup>
)

const AuthorForm = () => (
  <React.Fragment>
      <FormGroup>
	  <Label for="autor">Nome do autor da Mensagem</Label>
	  <Input type="text" id="autor" name="autor"  placeholder="Insira aqui o nome do autor da mensagem denunciada." />
      </FormGroup>
      <FormGroup>
	  <Label for="id">Número ou Perfil do autor da Mensagem</Label>
	  <Input type="text" id="id" name="id"  placeholder="Insira aqui o número do autor ou link do seu perfil." />
      </FormGroup>      
  </React.Fragment>
)

const GroupForm = () => (
  <React.Fragment>
      <FormGroup>
	  <Label for="grupo">Grupo de WhatsApp ou Facebook</Label>
	  <Input type="text" id="grupo" name="grupo"  placeholder="Insira aqui o nome do Grupo onde foi divulgado o conteúdo." />
      </FormGroup>
      <FormGroup>
	  <Label for="link">Endereço do grupo de WhatsApp ou Facebook</Label>
	  <Input type="text" id="link" name="link"  placeholder="Insira aqui o link do Grupo onde foi divulgado o conteúdo." />
      </FormGroup>      
  </React.Fragment>
)

const MidiaForm = () => (
  <FormGroup>
      <Label for="midias">Mídias relacionadas</Label>
      <Input type="file" name="midias[]" id="midiaFileInput" multiple placeholder="Insira aqui capturas de tela, memes,arquivos de áudio ou outros documentos." />
      <FormText>Insira aqui capturas de tela, memes,arquivos de áudio ou outros
	  documentos..</FormText>
  </FormGroup>
)

const LinksForm = () => (
  <FormGroup>
      <Label for="links">Links relacionados</Label>
      <Input type="text" id="links" name="links" placeholder="Insira links relacionados à denúncia, separados por vírgula."/>
  </FormGroup>
)

const TitleForm = () => (
  <FormGroup>
      <Label for="titulo">Título da Denúncia</Label>
      <Input type="text" id="titulo" name="titulo" placeholder="Entre com o título da denúncia" />
  </FormGroup>
)

const ReportForm = (form) => (
  <Container className='report-form'>
      <Intro {...form}/>
      <Form>
          <TitleForm/>
          <FormGroup>
              <Label for="conteudo">Conteúdo</Label>
              <Input type="textarea" id="conteudo" name="conteudo" placeholder="Descreva, com o máximo de argumentos possível a sua denúncia."/>
          </FormGroup>
          <Row>
              <Col>
                  <LinksForm/>
                  <MidiaForm/>
                  <CategoriasForm/>
              </Col>
              <Col>
                  <GroupForm/>
                  <AuthorForm/>
              </Col>
          </Row>
          <Row>
              <Col sm={{ size: 'auto', offset: 8}}>
                  <Button type="reset" color="light" large>Cancelar</Button>
                  {' '}
                  <Button type="submit" color="info" large>Enviar</Button>
              </Col>
          </Row>
      </Form>
  </Container>
)

export default withRouteData(({content: { form }}) => (
  <Container>
      <ReportForm {...form}/>
  </Container>
))
