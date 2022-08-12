/* eslint-disable @typescript-eslint/no-unsafe-call */
import "@nivinjoseph/n-ext";
import "./styles/main.scss";
import "material-design-icons/iconfont/material-icons.css";

import { ClientApp, DefaultDialogService, Vue } from "@nivinjoseph/n-app";
import { Routes } from "./pages/routes";
import { pages } from "./pages/pages";
import { ComponentInstaller, Registry } from "@nivinjoseph/n-ject";
import { given } from "@nivinjoseph/n-defensive";
import { MockTodoService } from "../sdk/services/todo-service/mock-todo-service";
import { MockStoreService } from "../sdk/services/store-service/mock-store-service";
import { components } from "./components/components";
import { LocalPaxManagementService } from "../sdk/services/pax-management-service/local-pax-management-service";
// Element-UI stuff
import * as Element from "element-ui"; // https://element.eleme.io/#/en-US/component
// @ts-expect-error no type def
import locale from "element-ui/lib/locale/lang/en";


Vue.use(Element, { locale });

class Installer implements ComponentInstaller
{
    public install(registry: Registry): void
    {
        given(registry, "registry").ensureHasValue().ensureIsObject();

        registry
            .registerSingleton("TodoService", MockTodoService)
            .registerSingleton("PaxManagementService", LocalPaxManagementService) // installing dependencies, usually used by VMs
            .registerSingleton("StoreService", MockStoreService);

        // Types of dependencies: 
        // registerSingleton: Singleton, one instance of the dependency class through out the lifecycle of the app.
        // registry.registerTransient: Transient, new instance of the dependency class is created when it needs to be injected.
        // registry.registerScoped: Scoped dependency, same instance is used if it's the same scope, else it it's new instance. 
        //                          Eg: Page and a component in that page will get the same instance of the dependency, while another page will get a new instance of the dependency.
        // registry.registerInstance: Instance dependency, similar to singleton, only deference is you provide the instance, and the instance is not created by the framework. 
    }
}


const client = new ClientApp("#app", "shell")
    .useInstaller(new Installer())
    .registerDialogService(new DefaultDialogService({ accentColor: "#93C5FC" }))
    .registerComponents(...components) // registering all your app components
    .registerPages(...pages)  // registering all your app pages
    .useAsInitialRoute(Routes.store)
    .useAsUnknownRoute(Routes.store)
    .useHistoryModeRouting();

client.bootstrap();