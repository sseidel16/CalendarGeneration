import { Home } from "./components/Home";
import { PanelController } from "./controllers/PanelController";

// @ts-ignore: uxp types not available
import { entrypoints } from "uxp";

const calendarController = new PanelController(() => <Home />, {
    id: "calendar"
});

entrypoints.setup({
    plugin: {
        create(plugin: any) {
            /* optional */ console.log("created", plugin);
        },
        destroy() {
            /* optional */ console.log("destroyed");
        }
    },
    panels: {
        calendar: calendarController
    }
});
