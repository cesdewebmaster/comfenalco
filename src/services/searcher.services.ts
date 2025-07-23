import axios from "axios";
import { URL_SEARCHER } from '../constants/endpoints';
import { SearchResult } from '../interfaces/Article.interface';
// import Swal from 'sweetalert2';

// @ts-ignore
import imageError from '../assets/images/CDA/image_modal-error.svg';


const searcherService = axios.create({
    baseURL: URL_SEARCHER,
    params: {
        word: '',
        page: 0,
        size: 50
    }
});

const getSearchResult = async (query: string) => {

    try {
        const res = await searcherService.get('', {
            params: {
                word: query,
                page: 0,
                size: 50
            }
        });

        if (res.data.status > 200) {
            console.log(res);
            // Swal.fire({
            //     title: '¡Vaya!',
            //     text: 'En este momento estamos presentando problemas para conectar con el servidor, vuelve a intentarlo luego.',
            //     imageUrl: imageError,
            //     customClass: {
            //         container: 'swal-cda-container'
            //     },
            //     focusConfirm: false,
            //     showCloseButton: true,
            //     closeButtonAriaLabel: 'botón cerrar modal',
            //     confirmButtonText: 'Volver',
            //     confirmButtonAriaLabel: 'Volver',
            // });
            return;
        }

        const resultsData: SearchResult[] = res.data.data.map((result: any) => {
            const itemResult = {
                entryId: result.entryId,
                title: result.title,
                description: result.description,
                slug: result.slug,
                category: result.contentfulArticleCategoryDto,
                miniatura: result.miniatureUrl
            }
            return itemResult;
        });
        return resultsData;

    } catch (error: any) {

        console.log(error)

        if (error) {
            // Swal.fire({
            //     title: '¡Vaya!',
            //     text: 'En este momento estamos presentando problemas para conectar con el servidor, vuelve a intentarlo luego.',
            //     imageUrl: imageError,
            //     customClass: {
            //         container: 'swal-cda-container'
            //     },
            //     focusConfirm: false,
            //     showCloseButton: true,
            //     closeButtonAriaLabel: 'botón cerrar modal',
            //     confirmButtonText: 'Volver',
            //     confirmButtonAriaLabel: 'Volver',
            // });
            return;
        }

    }

}

export default getSearchResult