import './BurgerMenu.scss';

const BurgerMenu = () => {

    const handleOpenMenu = () => {
        const menuOffCanvas = document.querySelector('.m-menu-offcanvas');
        const whiteHeader = document.querySelector('.m-header__main-header-container');
        document.body.classList.toggle("noscroll");
        menuOffCanvas?.classList.toggle('show-menu');

        (whiteHeader?.getBoundingClientRect().y === 0)
            ? menuOffCanvas?.classList.add('tree-mod')
            : menuOffCanvas?.classList.remove('tree-mod');
    }

    return (
        <div className='a-menu-icon' aria-label='Botón menú hamburguesa'>
            <input
                className="a-menu-icon__checkbox visuallyHidden"
                type="checkbox"
                id="a-menu-icon__checkbox"
                onClick={handleOpenMenu}
            />
            <label role='button' htmlFor="a-menu-icon__checkbox" >
                <div className="hamburger hamburger--mod">
                    <span className="bar bar1"></span>
                    <span className="bar bar2"></span>
                    <span className="bar bar3"></span>
                    <span className="bar bar4"></span>
                </div>
            </label>
        </div>
    )
}

export default BurgerMenu