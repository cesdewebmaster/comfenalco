import axios from "axios";
// import Swal from 'sweetalert2';
import { URL_ARTICLE_RATING } from '../constants/endpoints';

// @ts-ignore
import imageError from '../assets/images/CDA/image_modal-error.svg';

interface Vote {
    contentfulId: string,
    qualification: boolean,
    locale: string
}


const articleRatingService = axios.create({
    baseURL: URL_ARTICLE_RATING,
});

const sendVote = async (vote: Vote) => {
    try {
        const res = await articleRatingService.post('', vote);

        if (res.data.status > 200) {

            console.log(res)

            const resetChoice = JSON.parse(localStorage.getItem('choices')!);
            const newChoicesLSList = resetChoice.filter((choice: any) => {
                if (choice.path !== window?.location?.pathname) {
                    return choice;
                }
            });

            localStorage.setItem('choices', JSON.stringify(newChoicesLSList));

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

    } catch (error) {

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
            console.log(error);
        }
    }
}

export default sendVote