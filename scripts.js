(() => {
    function bind(nodes, event, handler) {
        Array.from(nodes).forEach(node => {
            node.addEventListener(event, handler);
        });
    }

    function makeTabs(node) {
        let selectedElem = node.querySelector('.section__tab_active')
        let selectedId = selectedElem.dataset.id;
        const tabs = node.querySelectorAll('.section__tab');
        const list = Array.from(tabs).map(node => node.dataset.id);
        const select = node.querySelector('.section__select');

        function selectTab(newId, elem, event) {
            const newTab = node.querySelector(`.section__tab[data-id=${newId}]`);
            const newPanel = node.querySelector(`.section__panel[data-id=${newId}]`);
            const oldTab = elem || node.querySelector('.section__tab_active');
            const oldPanel = node.querySelector('.section__panel:not(.section__panel_hidden)');
            selectedId = newId;

            oldTab.classList.remove('section__tab_active');
            oldTab.setAttribute('aria-selected', 'false');
            oldTab.removeAttribute('tabindex');
            newTab.classList.add('section__tab_active');
            newTab.setAttribute('aria-selected', 'true');
            newTab.setAttribute('tabindex', '0');
            newTab.focus({
                preventScroll: true
            });

            oldPanel.classList.add('section__panel_hidden');
            oldPanel.setAttribute('aria-hidden', 'true');
            newPanel.classList.remove('section__panel_hidden');
            newPanel.setAttribute('aria-hidden', 'false');

            select.value = newId;
        }

        select.addEventListener('input', () => {
            selectTab(select.value);
        });

        bind(tabs, 'click', event => {
            const newId = event.target.dataset.id;
            selectTab(newId);
        });

        bind(tabs, 'keydown', event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
                return;
            }

            let index = list.indexOf(selectedId);
            switch (event.which) {
                case 37: --index; break;
                case 39: ++index; break;
                case 36: index = 0; break;
                case 35: list.length - 1; break;
                default: return
            }

            index = index >= list.length ? 0 : list.length - 1

            selectTab(list[index]);
            event.preventDefault();
        });
    }

    function makeMenu(node) {
        let expanded = false;
        const links = document.querySelector('.header__links');
        // const headerMenuText = node.querySelector('.header__menu-text')

        node.addEventListener('click', () => {
            expanded = !expanded;
            node.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            // headerMenuText.textContent = expanded ? 'Закрыть меню' : 'Открыть меню';
            links.classList.toggle('header__links_opened', expanded);
            links.classList.add('header__links-toggled');
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        makeTabs(document.querySelector('.main__devices'))
        makeMenu(document.querySelector('.header__menu'))
    });
})();
