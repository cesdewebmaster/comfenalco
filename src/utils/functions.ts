import { navigate } from 'gatsby';
import { Category } from '../interfaces/Article.interface';
import useBrowserMode from '../shared/hooks/useBrowserMode';

const { window, localStorage } = useBrowserMode();

export const changeFontSize = (action: string, fontSize: any) => {
    if (typeof window !== 'undefined') {

        const item = document.querySelector('html')!;

        switch (action) {
            case '+':
                if (fontSize.get < 120) {
                    item.style.fontSize = `${fontSize.get + 20}%`;
                    fontSize.set(fontSize.get + 20);
                }
                break;
            case '-':
                if (fontSize.get > 80) {
                    item.style.fontSize = `${fontSize.get - 20}%`;
                    fontSize.set(fontSize.get - 20);
                }
                break;
        }
    }
}


export const scrollToTop = () => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


export const showHideOnHome = () => {
    if (
        window?.location?.pathname === '/'
        || window?.location?.pathname === '/resultados-busqueda/'
        || window?.location?.pathname === '/ayuda/'
        || window?.location?.pathname === '/ayuda/resultados-busqueda/'
    ) {
        return false
    } else {
        return true
    }
}


export const showScrollBtn = (scrollBtn: HTMLElement) => {
    scrollBtn.classList.add('fixed-on-internal');

    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
}


export const deleteTildes = (value: string) => {
    value = value.replace(/á/gi, "a")
    value = value.replace(/é/gi, "e")
    value = value.replace(/í/gi, "i")
    value = value.replace(/ó/gi, "o")
    value = value.replace(/ú/gi, "u")
    value = value.replace(/ñ/gi, "n")
    return value
}


export const extractSubcategories = (categories: Category[]) => {
    const subcategories: any[] = [];

    categories.forEach((cat, index) => {
        switch (index) {
            case 0:
            case 1:
            case 2:
                subcategories.push(cat)
                break;

            default:
                if (cat.subcategories!.length > 0) {
                    cat.subcategories!.map(subcat => {
                        subcategories.push(subcat)
                    })
                }
                break;
        }
    });


    return subcategories;
}


export const convertToKebabCase = (name: string) => {
    const result = name.split(' ');
    const newResult = result.map(word => {
        return deleteTildes(word).toLowerCase();
    });

    return newResult.join('-');
}


export const handleScrollTo = (elementId: string, slug: string) => {

    if (window?.location?.hostname !== 'localhost' || window?.location?.port === '9000') {
        if (window.location.pathname.split('/')[2] === slug && window.location.pathname.split('/').length < 4) {
            localStorage.setItem('clicked-section', elementId);
            const sectionDiv = document.getElementById(elementId);
            sectionDiv!.scrollIntoView({ block: 'center' });
        } else {
            localStorage.setItem('clicked-section', elementId);
            navigate(hasStartSlash(slug));
        }
    } else {
        if (window.location.pathname.split('/')[1] === slug && window.location.pathname.split('/').length < 3) {
            localStorage.setItem('clicked-section', elementId);
            const sectionDiv = document.getElementById(elementId);
            sectionDiv!.scrollIntoView({ block: 'center' });
        } else {
            localStorage.setItem('clicked-section', elementId);
            navigate(hasStartSlash(slug));
        }
    }

}


export const hasStartSlash = (slug: string) => {
    const reg = new RegExp('^/');
    if (slug?.search(reg) === -1) {
        return `/${slug}`
    } else {
        return slug
    }
}


export const toLocalStoragepageActive = () => {
    if (localStorage?.getItem("Redirection")) {
        const storage: any = localStorage?.getItem("Redirection")
        const data = JSON.parse(storage)
        if (data.titleButton === "CENTRO DE AYUDA") {
            return false
        } else {
            return localStorage?.setItem(
                "Redirection",
                JSON.stringify({
                    titleButton: "CENTRO DE AYUDA",
                    path: "/ayuda/",
                })
            )
        }
    } else {
        return localStorage.setItem(
            "Redirection",
            JSON.stringify({
                titleButton: "CENTRO DE AYUDA",
                path: "/ayuda/",
            })
        )
    }
}