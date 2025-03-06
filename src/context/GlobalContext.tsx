import { createContext, createEffect, createSignal, JSX, on, ParentProps, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { IGlobalContext, IModalConfigs } from "../@types/IGlobalContex";

export const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export const GlobalContextProvider = (props: ParentProps) => {

    const [list, setList] = createSignal<any | null>(null);
    const [openModalConfigs, setOpenModalConfigs] = createSignal<IModalConfigs>({
        open: false,
        type: null
    });
    const [totals, setTotals] = createSignal({
        entries: 0,
        expenses: 0,
        balance: 0
    })

    // effects
    createEffect(
        on(list, () => {
            if (list() === null) {
                // recupera os dados do localStorage
                const expensesList = localStorage.getItem('expenses_list');
                if (!expensesList) return;
                setList(JSON.parse(expensesList));
            } else {
                // atualiza todos os estados de entradas e saídas e salva no localStorage
                const totalEntries = list().transactions.filter((transaction: any) => transaction.type === 'entrada').reduce((total: number, transaction: any) => total + transaction.value, 0);

                const totalExpenses = list().transactions.filter((transaction: any) => transaction.type === 'saida').reduce((total: number, transaction: any) => total + transaction.value, 0);

                setTotals((prev) => ({...prev, entries: totalEntries, expenses: totalExpenses, balance: (list().salary + totalEntries) - totalExpenses}));

                localStorage.setItem('expenses_list', JSON.stringify(list()));
            }
        }, {
            defer: false
        }
        ))


    return (
        <GlobalContext.Provider value={{ list, setList, openModalConfigs, setOpenModalConfigs, totals }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    const context = useContext(GlobalContext)!;

    if (!context) throw new Error("useGlobalContext deve ser usado dentro de GlobalContextProvider");
    return context;
}
