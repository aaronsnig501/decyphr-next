import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Card, Row, Col } from 'react-bootstrap'
import api from '../../utils/api'
import DashboardLayout from '../../components/layout/dashboard'
import styles from './library.module.scss'

export default class Library extends React.Component {
  state = {
    libraryItems: [],
    searchResults: [],
    errors: []
  }

  componentDidMount = async () => {
    this.setState({'libraryItems': JSON.parse(localStorage.getItem('library'))})
  }

  truncateString = string => {
    if (string.length <= 150) {
      return string
    }
    return string.slice(0, 150) + '...'
  }

  proceedToSession = e => {
    e.preventDefault()

    Router.push({
      pathname: '/reading-session',
      query: { id: e.target.value },
    })
  }

  setSearchResults = data => {
    this.setState({'searchResults': data})
  }

  setErrors = data => {
    this.setState({'errors': data})
  }

  performBookSearch = text => {
    api({
      method: 'GET',
      endpointName: 'bookSearch',
      params: text,
      setState: this.setSearchResults,
      setErrors: this.setErrors,
      authRequired: true
    })
  }

  render () {
    return (
      <>
        <Head>
          <title>Your Library</title>
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css"></link>
        </Head>

        <DashboardLayout pageTitle="Library" pageSubtitle="Welcome to your Library. Here you can manage the books in your library or add more!">
          <input
            className={styles.bookSearch}
            list="json-datalist"
            type="text"
            placeholder="Search for books by title"
            onChange={e => this.performBookSearch(e.target.value)}
          />
          
          <button className={styles.primaryButton}>Add to library</button>
          <datalist id="json-datalist">
            {this.state.searchResults.map((result, index) => {
              return <option key={index} value={result.title} />
            })}
          </datalist>
            {this.state.libraryItems.map((item, index) => {
              return (
                <Row key={index} className="justify-content-md-center no-gutters">
                  <Col md={{ span: 8, offset: 1 }}>
                    <Card className="flex-row flex-wrap">
                      <Row>
                        <Col sm={12} md={2}>
                          <Card.Header>
                            <img src={item.book.small_thumbnail} alt="" />
                          </Card.Header>
                        </Col>
                        <Col sm={12} md={10}>
                          <Card.Body>
                            <Card.Title>{item.book.title}</Card.Title>
                            <Card.Text>{this.truncateString(item.book.description)}</Card.Text>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              )
            })}
        </DashboardLayout>
      </>
    )
  }
}