import React from 'react'
import { Container, Alert, Button,
         FormGroup, FormText,
         Label, Input,
         Row, Col } from 'reactstrap'
import { Field, Form, Formik, connect } from 'formik'
import Markdown from 'react-markdown'
//
import '../css/form.css'

export const Intro = ({content, data: { title }}) => (
  <FormGroup>
      <h1>{title}</h1>
      <Markdown source={content}/>
  </FormGroup>
)

const FormInput = connect(({id, formik: {touched, errors}, children, ...args}) => {
  const error = errors[id]
  const touch = touched[id]
  return (
    <FormGroup>
        <Label for={id}>{children}</Label>
        <Input tag={Field} type="text" id={id} name={id} {...args} valid={touch && !error} invalid={!!error}/>
        <div className='invalid-feedback'>{error}</div>
    </FormGroup>
  )
})

const CategoryRadio = ({children, ...args}) => (
  <FormGroup>
      <Label check>
          <Input tag={Field} type="radio" name="categorias" id="checksCategoria1" {...args}/>
          {children}
      </Label>
  </FormGroup>
)

export const CategoriasForm = () => (
  <FormGroup>
      <Label for="checksCategoria">Categorias</Label>
      <Container>
          <Row>
	      <Col>
                  <CategoryRadio value="fakenews">FakeNews</CategoryRadio>
                  <CategoryRadio value="machismo">Machismo</CategoryRadio>
                  <CategoryRadio value="racismo">Racismo</CategoryRadio>
                  <CategoryRadio value="fomofobia">Homofobia</CategoryRadio>
              </Col>
              <Col>
                  <CategoryRadio value="violencia">Violência</CategoryRadio>
                  <CategoryRadio value="xenofobia">Xenofobia</CategoryRadio>
                  <CategoryRadio value="etnofobia">Etnofobia</CategoryRadio>
                  <CategoryRadio value="outros">Outros</CategoryRadio>
              </Col>
          </Row>
      </Container>
  </FormGroup>
)

export const AuthorForm = () => (
  <React.Fragment>
      <FormInput id="autor" placeholder="Insira aqui o nome do autor da mensagem denunciada.">
          Nome do autor da Mensagem
      </FormInput>
      <FormInput id="id" placeholder="Insira aqui o número do autor ou link do seu perfil.">
          Número ou Perfil do autor da Mensagem
      </FormInput>
  </React.Fragment>
)

export const GroupForm = () => (
  <React.Fragment>
      <FormInput id="grupo"
                 placeholder="Insira aqui o nome do Grupo onde foi divulgado o conteúdo.">
          Grupo de WhatsApp ou Facebook
      </FormInput>
      <FormInput id="link"
                 placeholder="Insira aqui o link do Grupo onde foi divulgado o conteúdo.">
          Endereço do grupo de WhatsApp ou Facebook
      </FormInput>
  </React.Fragment>
)

export const MidiaForm = () => (
  <FormInput type="file" id="midias" multiple placeholder="Insira aqui capturas de tela, memes,arquivos de áudio ou outros documentos.">
      Mídias relacionadas
      <FormText>Insira aqui capturas de tela, memes,arquivos de áudio ou outros
	  documentos..</FormText>
  </FormInput>
)

export const LinksForm = () => (
  <FormInput id="links" placeholder="Insira links relacionados à denúncia, separados por vírgula.">

      Links relacionados
  </FormInput>
)

export const TitleForm = () => (
  <React.Fragment>
      <FormInput id="titulo"  placeholder="Entre com o título da denúncia">
          Título da Denúncia
      </FormInput>
      <FormInput type="textarea" id="conteudo" rows="3"
                 placeholder="Descreva, com o máximo de argumentos possível a sua denúncia.">
          Conteúdo
      </FormInput>
  </React.Fragment>
)

export const ReportForm = ({onSubmit, ...form}) => (
  <Container className='report-form'>
      <Intro {...form}/>
      <Formik
        initialValues={{}}
        validate={({titulo, conteudo}) => {
            const errors = {};
            if (!titulo) errors.titulo = 'preencha un titulo'
            if (!conteudo) errors.conteudo = 'nos conte o que esta denunciando'
            return errors;
        }}
        onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
                <TitleForm/>
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
                        <Button type="reset" color="light">Cancelar</Button>
                        {' '}
                        <Button type="submit" color="info" disabled={isSubmitting}>Enviar</Button>
                    </Col>
                </Row>
            </Form>
          )}
      </Formik>
  </Container>
)
