import * as squel from 'squel';

export interface IAlaSquel<T> extends squel.Select {
    has(relation: any): this;
    row(index?: number): T;
    get(): Array<T>;
    load(data: any, Model?: T): this;
    raw(query: string): Array<T>;
}