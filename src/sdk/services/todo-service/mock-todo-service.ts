import { TodoService } from "./todo-service";
import { given } from "@nivinjoseph/n-defensive";
import { MockTodoProxy } from "../../proxies/todo/mock-todo-proxy";
import { Todo } from "../../proxies/todo/todo";
import { SequencedHelper } from "./sequenced";


export class MockTodoService implements TodoService
{
    private _todos: Array<MockTodoProxy>;
    private _counter: number;


    public constructor()
    {
        const todos = new Array<MockTodoProxy>();
        const count = 10;

        for (let i = 0; i < count; i++)
            todos.push(new MockTodoProxy("id" + i, "title" + i, i, "description" + i));

        this._todos = todos;
        this._counter = count;
    }


    public getTodos(): Promise<ReadonlyArray<Todo>>
    {
        return Promise.resolve(this._todos);
    }

    public getTodo(id: string): Promise<Todo>
    {
        given(id, "id").ensureHasValue().ensureIsString();

        return Promise.resolve(this._todos.find(t => t.id === id) as Todo);
    }

    public createTodo(title: string, description: string): Promise<Todo>
    {
        given(title, "title").ensureHasValue().ensureIsString();
        given(description, "description").ensureIsString();

        const todo = new MockTodoProxy("id" + this._counter++, title.trim(), this._todos.length, description);
        this._todos = SequencedHelper.reSequence([...this._todos, todo]);
        return Promise.resolve(todo);
    }

    public async changeSequence(id: string, sequence: number): Promise<void>
    {
        const item = this._todos.find(t => t.id === id)!;
        item.updateSequence(sequence);
        this._todos = SequencedHelper.reSequence(this._todos, item);
    }
}