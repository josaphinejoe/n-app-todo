import { Sequenced } from "../../services/todo-service/sequenced";

export interface Todo extends Sequenced
{
    id: string;
    title: string;
    description: string | null;
    isCompleted: boolean;
    isDeleted: boolean;


    update(title: string, description: string): Promise<void>;
    complete(): Promise<void>;
    delete(): Promise<void>;
}