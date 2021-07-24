
import { TodoViewModel } from "./todo/todo-view-model";
import { ShellViewModel } from "./shell/shell-view-model";
import { SchedulerExampleViewModel } from "./scheduler-example/scheduler-example-view-model";


export const components: Array<Function> = [
    ShellViewModel,
    TodoViewModel,

    SchedulerExampleViewModel
];