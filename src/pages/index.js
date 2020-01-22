import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Dashboard from "./sections/dashboard"
import "./index.css"

const IndexPage = () => (
  <Layout>
    <SEO title="BTC Dashboard" />
    <Dashboard />
  </Layout>
)

export default IndexPage
