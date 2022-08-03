import "@babel/polyfill";
import "@nivinjoseph/n-ext"; // JavaScript Type Extension Library.
import "./styles/main.scss"; // A Main Styling File.
import * as $ from "jquery";
(<any>window).jQuery = $; (<any>window).$ = $;

import { ClientApp } from "@nivinjoseph/n-app"; // Required for setting up the Vue application.
import * as Routes from "./pages/routes"; // Used to Define Initial Routes and Redirection.
import { pages } from "./pages/page"; // Import all Pages to Register Them.
import { components } from "./components/component"; // Import all Components to Register Them.
import { ComponentInstaller, Registry } from "@nivinjoseph/n-ject"; // Adding Dependency Inversion Library into the Project.
import { given } from "@nivinjoseph/n-defensive"; // Defensive Check Library.
import { MenuImplementation } from "../sdk/services/menuService/menuImplementation";
import { ItemServiceImplementation } from "./services/itemService/itemServiceImplementation";
// import { MessageServiceImplementation } from "../sdk/services/messageService/messageImplementation";

class Installer implements ComponentInstaller
{
    public install(registry: Registry): void
    {
        given(registry, "registry").ensureHasValue().ensureIsObject();
        registry.registerSingleton("MenuService", MenuImplementation);
        registry.registerSingleton("ItemService", ItemServiceImplementation);
        

        // Here's where you can register your dependencies.
        // Learn more about our dependency injection library @ https://github.com/nivinjoseph/n-ject.
    }
}

const client = new ClientApp("#app", "shell")
    .useInstaller(new Installer())
    .registerComponents(...components) // Registering all the Components.
    .registerPages(...pages) // Registering all the Pages.
    .useAsInitialRoute(Routes.menu) // The initial route to your application.
    .useAsUnknownRoute(Routes.menu); // When a user goes onto a unknown route, they'll be redirected here.

client.bootstrap();