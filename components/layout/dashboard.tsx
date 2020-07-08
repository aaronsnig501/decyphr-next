import Head from 'next/head'
import { Container, Row, Col } from 'react-bootstrap'
import Navigation from '../../components/layout/Navigation'
import styles from './dashboard.module.scss'

export default function DashboardLayout({ children, title, pageTitle, pageSubtitle }) {

  return (
    <>
      <Head>
        <title>{ title }</title>
      </Head>
      <Container fluid>
        <main className={styles.layout}>
          <Navigation />
          <section>
            <Row noGutters={true}>
              <Col xs={{ span: 11, offset: 1 }}>
                <h1 className={styles.pageTitle}>{pageTitle}</h1>
              </Col>

              <Col xs={{ span: 11, offset: 1 }}>
                <p className={styles.pageSubtitle}>{pageSubtitle}</p>
              </Col>
            </Row>
          </section>

          <section>
            {children}
          </section>
        </main>
      </Container>
    </>
  )
}