import { graphql, useStaticQuery } from "gatsby";
import UserTypeSelector from "./components/UserTypeSelector/UserTypeSelector";
import MainHeader from "./components/MainHeader/MainHeader";

import "./header.scss"

const Header = () => {

  const { allContentfulTemplate } = useStaticQuery(
    graphql`query GET_CAD_HEADER_CONTENT {
      allContentfulTemplate(filter: { nombre: { eq: "Header CAD" } }) {
        nodes {
          span
          url
          image {
            title
            file {
              url
            }
          }
          referencias {
            span
            placeholder
            image {
              title
              file {
                url
              }
            }
          }
        }
      }
    }`
  )

  return (
    <>
      <header className="m-header">

        <UserTypeSelector dataHeader={allContentfulTemplate} />

      </header>

      <MainHeader dataHeader={allContentfulTemplate} />

    </>
  )
}

export default Header
