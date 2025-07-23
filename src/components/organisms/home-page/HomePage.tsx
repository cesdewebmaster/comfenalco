import { graphql, useStaticQuery } from "gatsby";

import HomeBannerSearch from '../../molecules/home-banner-search/HomeBannerSearch'
import HomeCategories from '../../molecules/home-categories/HomeCategories'
// import HomePopulars from '../../molecules/home-populars/HomePopulars'

const HomePage = () => {

  const { allContentfulHome } = useStaticQuery(
    graphql`query GET_CAD_HOME_CONTENT {
            allContentfulHome(filter: { nombre: { eq: "Home CAD" } }) {
              nodes {
                banner {
                  image {
                    title
                    file {
                      url
                    }
                  }
                  referencias {
                    placeholder
                    image {
                      title
                      file {
                        url
                      }
                    }
                    button {
                      copy
                      url
                    }
                  }
                }
                tree {
                  h2
                  h3
                  referencias {
                    span
                    url
                    color
                    icon
                    image {
                      title
                      file {
                        url
                      }
                    }
                    referencias {
                      h2
                      referencias {
                        span
                        url
                      }
                    }
                  }
                }
              }
            }
          }`
  );

  const bannerData = {
    // title: allContentfulHome.nodes[0].banner.h1,
    // span: allContentfulHome.nodes[0].banner.span,
    bgImage: allContentfulHome.nodes[0].banner.image[0].file.url,
    bgLogo: allContentfulHome.nodes[0].banner.image[1].file.url
  };
  // const mostUsedData = {
  //   title: allContentfulHome.nodes[0].mostUsed.h2,
  //   topPopular: allContentfulHome.nodes[0].mostUsed.referencias
  // };
  const dataCategoriesHome = {
    title: allContentfulHome.nodes[0].tree.h2,
    descrip: allContentfulHome.nodes[0].tree.h3,
    dataCategories: allContentfulHome.nodes[0].tree.referencias.map((cat: any) => {
      const itemCategory = {
        name: cat.span,
        color: cat.color,
        icon: cat.icon,
        subcategories:
          (cat.referencias)
            ?
            cat.referencias[0].referencias.map((subcat: any) => {
              const itemSubcat = {
                name: subcat.span,
                desc: '',
                slug: subcat.url
              }
              return itemSubcat;
            })
            :
            []
      }
      return itemCategory;
    })
  };


  return (
    <>
      <HomeBannerSearch bannerData={bannerData} />
      {/* <HomePopulars mostUsedData={mostUsedData} /> */}
      <HomeCategories dataCategoriesHome={dataCategoriesHome} />
    </>
  )
}

export default HomePage