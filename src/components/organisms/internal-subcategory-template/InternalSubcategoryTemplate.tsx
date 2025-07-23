import { useEffect } from 'react';
import { showScrollBtn } from '../../../utils/functions';
import useBrowserMode from '../../../shared/hooks/useBrowserMode';

import TreeDesktop from '../../molecules/tree-desktop/TreeDesktop';
import SectionList from '../../molecules/sections-list/SectionList';
import VideosAbout from '../../molecules/videos-about/VideosAbout';

import './InternalSubcategoryTemplate.scss';


const InternalSubcategoryTemplate = ({ data }: any) => {

    const { window } = useBrowserMode();

    const { categories, subcategories } = data;

    const currentUrl = (window?.location?.hostname !== 'localhost' || window?.location?.port === '9000')
        ? window?.location?.pathname.split('/')[2]
        : window?.location?.pathname.split('/')[1];

    const selectedSubcategory = subcategories.filter((subcat: any) => (subcat.slug === currentUrl))[0];

    useEffect(() => {
        let scrollBtn = document.getElementById("btnScrollTop")!;
        window.addEventListener('scroll', () => showScrollBtn(scrollBtn));

        return () => {
            window.removeEventListener('scroll', () => showScrollBtn(scrollBtn));
        }
    }, []);


    return (
        <div className='o-internal-subcategory-template'>
            <div className='cda-main-container'>
                <div className='tree-and-section'>
                    <TreeDesktop
                        categories={categories}
                        selectedSubcategory={selectedSubcategory} />
                    <SectionList
                        selectedSubcategory={selectedSubcategory}
                    />
                </div>
            </div>
            <VideosAbout />
        </div>
    )
}

export default InternalSubcategoryTemplate