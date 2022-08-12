import { given } from "@nivinjoseph/n-defensive";

export interface Sequenced
{
    get id(): string;

    get sequence(): number;

    updateSequence(sequence: number): void;
}


export class SequencedHelper
{
    /**
     * @static
     */
    private constructor() { }

    public static reSequence<T extends Sequenced>(items: ReadonlyArray<T>, updateItem?: T): Array<T>
    {
        given(items, "items").ensureHasValue().ensureIsArray();
        given(updateItem as Sequenced, "updateItem").ensureIsObject()
            .ensure(t => items.some(u => u.id === t.id), "Value is not in items. Not an update.");

        items = items.orderBy(t => t.sequence);
        if (updateItem)
        {
            const oldItem = items.find(t => t.id === updateItem.id)!;
            items = items.where(t => t.id !== oldItem.id);
            if (updateItem.sequence > oldItem.sequence)
            {
                items = [...items, updateItem];
            }
            else if (updateItem.sequence < oldItem.sequence)
            {
                items = [updateItem, ...items];
            }
            else
            {
                items = [...items, updateItem];
            }

            items = items.orderBy(t => t.sequence);
        }

        const result = new Array<T>();

        for (let i = 0; i < items.length; i++)
        {
            items[i].updateSequence(i);
            result.push(items[i]);
        }

        return result;
    }
}