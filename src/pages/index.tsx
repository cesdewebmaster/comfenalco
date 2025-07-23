import * as React from "react"
import Layout from "../components/organisms/layout/layout"

import '../styles/index.scss';
import '../styles/CDA/icons-cda.scss';
import '../styles/CDA/utils.scss';

import HomePage from "../components/organisms/home-page/HomePage";
import SEO from "../shared/components/SEO";

class IndexPage extends React.Component {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <>
        <SEO title="Comfenalco-Cartagena" index={true} />
        <Layout>
          <HomePage />
        </Layout>
      </>
    )
  }
}


export default IndexPage
