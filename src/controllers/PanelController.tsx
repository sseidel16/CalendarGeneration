import * as ReactDOM from "react-dom";

type MenuItem = {
    id: string;
    label: string;
    enabled?: boolean;
    checked?: boolean;
    oninvoke?: () => void;
};

const _id = Symbol("_id");
const _root = Symbol("_root");
const _attachment = Symbol("_attachment");
const _Component = Symbol("_Component");
const _menuItems = Symbol("_menuItems");


export class PanelController {
    [_id]: string | null;
    [_root]: HTMLElement | null;
    [_attachment]: any;
    [_Component]: any;
    [_menuItems]: MenuItem[];
    menuItems: MenuItem[];
    [key: string]: any;

    constructor(Component: any, { id, menuItems }: { id?: string; menuItems?: MenuItem[] } = {}) {
        this[_id] = null;
        this[_root] = null;
        this[_attachment] = null;
        this[_Component] = null;
        this[_menuItems] = [];

        this[_Component] = Component;
        this[_id] = id || null;
        this[_menuItems] = menuItems || [];
        this.menuItems = this[_menuItems].map(menuItem => ({
            id: menuItem.id,
            label: menuItem.label,
            enabled: menuItem.enabled ?? true,
            checked: menuItem.checked ?? false
        }));

        [ "create", "show", "hide", "destroy", "invokeMenu" ].forEach(fn => this[fn] = this[fn].bind(this));
    }

    create() {
        this[_root] = document.createElement("div");
        this[_root].style.height = "100vh";
        this[_root].style.overflow = "auto";
        this[_root].style.padding = "8px";

        ReactDOM.render(this[_Component]({panel: this}), this[_root]);

        return this[_root];
    }

    show(event: any)  {
        if (!this[_root]) this.create();
        this[_attachment] = event;
        this[_attachment].appendChild(this[_root]);
    }

    hide() {
        if (this[_attachment] && this[_root]) {
            this[_attachment].removeChild(this[_root]);
            this[_attachment] = null;
        }
    }

    destroy() { }

    invokeMenu(id: string) {
        const menuItem = this[_menuItems].find(c => c.id === id);
        if (menuItem) {
            const handler = menuItem.oninvoke;
            if (handler) {
                handler();
            }
        }
    }
}
