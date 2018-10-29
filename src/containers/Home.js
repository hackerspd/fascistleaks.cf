import React from 'react'
import { withRouteData } from 'react-static'
import { Container, Alert } from 'reactstrap'
import Markdown from 'react-markdown'
//
import Post from './Post'

const Intro = ({content, data: { title }}) => (
  <Alert color="info">
      <h3>{title}</h3>
      <Markdown source={content}/>
  </Alert>
)

export default withRouteData(({content: { intro }, posts}) => (
  <Container>
      <Intro {...intro}/>
      <hr/>
      {Object.values(posts).map(p => <Post key={p.slug} {...p}/>)}
  </Container>
))
