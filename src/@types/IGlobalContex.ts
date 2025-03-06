import { Accessor, Setter } from "solid-js";

export type ListProps = {
    salary: number;
    transactions: any[]
} | null

export interface IModalConfigs {
    open: boolean;
    type: 'newTransaction' | 'deleteTransaction' | 'deleteAllTransactions' | null;
    transaction?: any;
}

export interface IGlobalContext {
    list: Accessor<ListProps>;
    setList: Setter<ListProps>;
    openModalConfigs: Accessor<any>;
    setOpenModalConfigs: Setter<any>;
    totals: Accessor<any>;
}