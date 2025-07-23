import { useEffect, useState } from 'react';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import { Category, Section, Subcategory } from '../../../interfaces/Article.interface';
import { handleScrollTo } from '../../../utils/functions';

// @ts-ignore
import iconChevronR from '../../../assets/icons/CDA/icon_chevron-right.svg';
// @ts-ignore
import iconPlus from '../../../assets/icons/CDA/icon_plus.svg';
// @ts-ignore
import iconMinus from '../../../assets/icons/CDA/icon_minus.svg';

import './TreeDesktop.scss';



interface Props {
  categories: Category[],
  selectedSubcategory: any
}

interface AcordeonProps {
  state: any,
  category: Category
}

interface AcordeonSecondProps {
  state: any,
  category: Category,
  subcategory: Subcategory
}

const TreeDesktop = ({ categories, selectedSubcategory }: Props) => {

  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [selectedSubcat, setSelectedSubcat] = useState<any>({});

  useEffect(() => {
    setCategoriesData(categories)
    setSelectedSubcat(selectedSubcategory)
  }, []);


  const isActiveTree = (category: Category, index: number) => {
    if (!category || !selectedSubcat) return false; // Verificación adicional
  
    switch (index) {
      case 0:
      case 1:
      case 2:
        if (category.slug && category.slug === selectedSubcat.slug) {
          return true;
        } else {
          return false;
        }
      default:
        if (category.subcategories && category.subcategories.find(subcat => subcat.slug === selectedSubcat.slug)) {
          return true;
        } else {
          return false;
        }
    }
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
    <div className='m-tree-desktop'>

      <Accordion transition className='m-tree-container'>

        {categoriesData.map((category, index) => (

          <AccordionItem
            key={index}
            header={({ state }) => <AccordionHeaderFirstLevel category={category} state={state} />}
            initialEntered={isActiveTree(category, index)}
            contentProps={{ className: ({ isEnter }) => isEnter ? 'remove-height' : '' }}
            buttonProps={{ className: `a-tree-btn gtmMenulatrealcategorias${category.name.replace(/ /g, '')}` }}
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
                                // href={`/${category.slug}`}
                                onClick={() => handleScrollTo(section.url, category.slug!)}
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
                          initialEntered={subcategory.slug === selectedSubcategory?.slug ? true : false}
                          header={
                            ({ state }) => (
                              <AccordionHeaderSecondLevel
                                state={state}
                                subcategory={subcategory}
                                category={category} />
                            )
                          }
                          buttonProps={{ className: `a-tree-header__lvl2 gtmMenulateralsubcategorias${subcategory.name.replace(/ /g, '')}` }}
                          panelProps={{ className: 'a-tree-body__lvl2' }}
                        >
                          {
                            subcategory.sections!.map((section: Section, index) => (
                              <div key={index} className='a-tree-section__lvl2'>
                                <div className='bullet-icon'></div>
                                <button
                                  // href={`/${subcategory.slug}`}
                                  onClick={() => handleScrollTo(section.url, subcategory.slug)}
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

export default TreeDesktop