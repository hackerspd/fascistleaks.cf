import React from 'react'
import Markdown from 'react-markdown'
import { Card, CardImg, CardText, CardBody,
         CardTitle, CardSubtitle, Button } from 'reactstrap';


const Post = ({ content, data: { title, subtitle } }) => (
  <Card>
      <CardBody>
          <CardTitle>{title}</CardTitle>
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
          <CardText>
              <Markdown source={content}/>
          </CardText>

      </CardBody>
  </Card>
)

export default Post
