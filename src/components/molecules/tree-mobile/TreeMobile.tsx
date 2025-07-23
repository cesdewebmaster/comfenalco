import { useEffect, useState } from 'react';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import { graphql, useStaticQuery } from 'gatsby';
import { Category, Section, Subcategory } from '../../../interfaces/Article.interface';
import useBrowserMode from '../../../shared/hooks/useBrowserMode';
import { convertToKebabCase, extractSubcategories, handleScrollTo } from '../../../utils/functions';

// @ts-ignore
import iconChevronR from '../../../assets/icons/CDA/icon_chevron-right.svg';
// @ts-ignore
import iconPlus from '../../../assets/icons/CDA/icon_plus.svg';
// @ts-ignore
import iconMinus from '../../../assets/icons/CDA/icon_minus.svg';


import './TreeMobile.scss';


interface AcordeonProps {
  state: any,
  category: Category
}

interface AcordeonSecondProps {
  state: any,
  category: Category,
  subcategory: Subcategory
}


const TreeMobile = () => {

  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [selectedSubcat, setSelectedSubcat] = useState<any>({});
  const { allContentfulTemplate } = useStaticQuery(graphql`
        query GET_CDA_TREE {
            allContentfulTemplate(filter: {nombre: {eq: "Árbol categorías"}}) {
            nodes {
                referencias {
                span
                span2
                h3
                url
                slug
                color
                icon
                image {
                    title
                    file {
                    url
                    }
                }
                secciones {
                    h2
                    articulo {
                    h2
                    slug
                    }
                    button {
                    copy
                    }
                }
                referencias {
                    referencias {
                    span
                    url
                    slug
                    referencias {
                        h3
                        secciones {
                        h2
                        articulo {
                            h2
                            slug
                        }
                        button {
                            copy
                        }
                        }
                    }
                    }
                }
                }
            }
            }
        }
    `);

  useEffect(() => {
    const categories: Category[] = allContentfulTemplate.nodes[0].referencias.map((cat: any) => {
      const itemCategory = {
        name: cat.span,
        desc: cat.h3 || '',
        color: cat.color,
        icon: cat.icon || '',
        slug: (cat.slug) ? cat.slug.trim() : '',
        sections:
          (cat.secciones)
            ?
            cat.secciones.map((section: any) => {
              const itemSection = {
                name: section.h2,
                url: `${convertToKebabCase(section.h2)}`,
                articles:
                  (section.articulo)
                    ?
                    section.articulo.map((article: any) => {
                      const itemArticle = {
                        name: article.h2,
                        slug: `${cat.slug}/${article.slug}`
                      }
                      return itemArticle;
                    })
                    :
                    []
              }
              return itemSection;
            })
            :
            []
        ,
        subcategories:
          (cat.referencias)
            ?
            cat.referencias[0].referencias.map((subcat: any) => {
              const itemSubcat = {
                name: subcat.span,
                desc: (subcat.referencias) ? subcat.referencias[0].h3 : '',
                slug: (subcat.slug) ? subcat.slug.trim() : '',
                sections:
                  (subcat.referencias)
                    ?
                    subcat.referencias[0].secciones.map((section: any) => {
                      const itemSection = {
                        name: section.h2,
                        url: `${convertToKebabCase(section.h2)}`,
                        articles:
                          (section.articulo)
                            ?
                            section.articulo.map((article: any) => {
                              const itemArticle = {
                                name: article.h2,
                                slug: `${subcat.slug}/${article.slug}`
                              }
                              return itemArticle;
                            })
                            :
                            []
                      }
                      return itemSection;
                    })
                    :
                    []
              }
              return itemSubcat;
            })
            :
            []

      }
      return itemCategory;
    });
    const subcategories = extractSubcategories(categories);
    const selectedSubcategory = subcategories.filter(subcat => (subcat.slug === currentUrl))[0];
    setCategoriesData(categories)
    setSelectedSubcat(selectedSubcategory)
  }, []);


  const { window } = useBrowserMode();

  const currentUrl = (window?.location?.hostname !== 'localhost' || window?.location?.port === '9000')
    ? window?.location?.pathname.split('/')[2]
    : window?.location?.pathname.split('/')[1];


  const isActiveTree = (category: Category, index: number) => {
    switch (index) {
      case 0:
      case 1:
      case 2:
        if (category.slug === selectedSubcat?.slug) {
          return true
        } else {
          return false
        }
      default:
        if (category.subcategories!.find(subcat => subcat.slug === selectedSubcat?.slug)) {
          return true
        } else {
          return false
        }
    }
  }

  const handleOpenMenu = () => {
    const menuOffCanvas = document.querySelector('.m-menu-offcanvas');
    const burgerMenuIcon: any = document.querySelector('.a-menu-icon__checkbox');
    document.body.classList.toggle("noscroll");
    burgerMenuIcon.checked = false;
    menuOffCanvas?.classList.toggle('show-menu');
  }

  const AccordionHeaderFirstLevel = ({ state, category }: AcordeonProps) => {
    return (
      <>
        <div className={`a-tree-btn__title gtmMenulatrealcategorias${category.name.replace(/ /g, '')}`}>
          <span className={`gtmMenulatrealcategorias${category.name.replace(/ /g, '')}`}>
            <i
              className={`${category.icon} gtmMenulatrealcategorias${category.name.replace(/ /g, '')}`}
              style={{ color: state.isEnter ? category.color : '' }}></i>
          </span>
          <section className={`gtmMenulatrealcategorias${category.name.replace(/ /g, '')}`}>{category.name}</section>
        </div>
        <div className={`a-tree-btn__action ${state.isEnter ? 'open-tree' : ''} gtmMenulatrealcategorias${category.name.replace(/ /g, '')}`}>
          {
            (state.isEnter)
              ? <img src={iconMinus} alt="Botón contraer" />
              : <img
                src={iconPlus}
                alt="Botón expandir"
                className={`gtmMenulatrealcategorias${category.name.replace(/ /g, '')}`}
              />
          }
        </div>
      </>
    )
  }

  const AccordionHeaderSecondLevel = ({ state, category, subcategory }: AcordeonSecondProps) => {
    return (
      <div
        className={`a-tree-btn__lvl2 gtmMenulateralsubcategorias${subcategory.name.replace(/ /g, '')}`}
        style={{ borderLeft: `2px solid ${category.color}` }}
      >
        <section className={`gtmMenulateralsubcategorias${subcategory.name.replace(/ /g, '')}`}>{subcategory.name}</section>
        <div className={`a-tree-btn__action__lvl2  ${state.isEnter ? 'open-tree' : ''} gtmMenulateralsubcategorias${subcategory.name.replace(/ /g, '')}`}>
          {
            (state.isEnter)
              ? <img src={iconMinus} alt="Botón contraer" />
              : <img
                src={iconPlus}
                alt="Botón expandir"
                className={`gtmMenulateralsubcategorias${subcategory.name.replace(/ /g, '')}`}
              />
          }
        </div>
      </div>
    )
  }

  return (
    <div className='m-tree-mobile'>

      <Accordion transition className='m-tree-container'>

        {categoriesData.map((category, index) => (

          <AccordionItem
            key={index}
            header={({ state }) => <AccordionHeaderFirstLevel category={category} state={state} />}
            initialEntered={isActiveTree(category, index)}
            contentProps={{ className: ({ isEnter }) => isEnter ? 'remove-height' : '' }}
            buttonProps={{ className: `a-tree-btn gtmMenulatrealcategorias${category.name.replace(/ /g, '')}`, tabIndex: -1 }}
          >
            {
              ({ state }) => (

                <Accordion
                  key={index}
                  className={`a-tree-body ${state.isEnter ? 'open-tree' : ''}`}
                  transition
                >
                  {
                    (category.sections!.length > 0)
                      ?
                      <div>
                        {
                          category.sections!.map((section: Section, index: number) => (
                            <div className='a-tree-section' key={index}>
                              <div className='bullet-icon'></div>
                              <button
                                onClick={() => { handleOpenMenu(); handleScrollTo(section.url, category.slug!) }}
                                tabIndex={-1}
                              >
                                {section.name}
                              </button>
                            </div>
                          ))
                        }
                      </div>
                      :
                      category.subcategories!.map((subcategory: Subcategory, index: number) => (
                        <AccordionItem
                          key={index}
                          initialEntered={subcategory.slug === selectedSubcat?.slug ? true : false}
                          header={
                            ({ state }) => (
                              <AccordionHeaderSecondLevel
                                state={state}
                                subcategory={subcategory}
                                category={category} />
                            )
                          }
                          buttonProps={{ className: `a-tree-header__lvl2 gtmMenulateralsubcategorias${subcategory.name.replace(/ /g, '')}`, tabIndex: -1 }}
                          panelProps={{ className: 'a-tree-body__lvl2' }}
                        >
                          {
                            subcategory.sections!.map((section: Section, index) => (
                              <div key={index} className='a-tree-section__lvl2'>
                                <div className='bullet-icon'></div>
                                <button
                                  onClick={() => { handleOpenMenu(); handleScrollTo(section.url, subcategory.slug) }}
                                  tabIndex={-1}
                                >
                                  <h4>{section.name}</h4>
                                </button>
                              </div>
                            ))
                          }
                        </AccordionItem>
                      ))
                  }
                </Accordion>
              )
            }
          </AccordionItem>

        ))
        }

      </Accordion >

    </div >
  )
}

export default TreeMobile