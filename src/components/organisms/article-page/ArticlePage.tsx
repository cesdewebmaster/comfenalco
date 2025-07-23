import './ArticlePage.scss';

import TreeDesktop from '../../molecules/tree-desktop/TreeDesktop';
import ArticleSection from '../../molecules/article-section/ArticleSection';
import VideosAbout from '../../molecules/videos-about/VideosAbout';

import useBrowserMode from '../../../shared/hooks/useBrowserMode';

const ArticlePage = ({ data }: any) => {

    const { window } = useBrowserMode();

    const { categories, subcategories, dataArticle } = data;

    const currentUrl = (window?.location?.hostname !== 'localhost' || window?.location?.port === '9000')
        ? window?.location?.pathname.split('/')[2]
        : window?.location?.pathname.split('/')[1];
        
    const currentCategory = categories.filter((subcat: any) => (subcat.slug === currentUrl))[0];
    const currentSubcategory = subcategories.filter((subcat: any) => (subcat.slug === currentUrl))[0];
    const selectedSubcategory = currentSubcategory || currentCategory;

    return (
        <div className='o-article-page'>
            <div className='cda-main-container'>
                <div className='tree-and-section'>
                    <TreeDesktop
                        categories={categories}
                        selectedSubcategory={selectedSubcategory} />
                    <ArticleSection
                        data={dataArticle}
                        selectedSubcategory={selectedSubcategory} />
                </div>
            </div>
            <VideosAbout />
        </div>
    )
}

export default ArticlePage