import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AdminCardSection1 from "./sections/AdminCardSection1"
import "./index.css"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <AdminCardSection1 />
  </Layout>
)

export default IndexPage
