import { ListProps } from "../@types/IGlobalContex";
import { CATEGORIES } from "../constants/categories";

export function getTotalCategoriesValues(list: ListProps) {

    if (!list) return;

    let totalExpenses: number[] = [];
    const filteredTransactions = list.transactions.filter((transaction: any) => transaction.type === 'saida');

    for (let index = 0; index < CATEGORIES.length; index++) {
        const category = CATEGORIES[index];
        const total = filteredTransactions.filter((transaction: any) => transaction.category === category.name).reduce((total: number, transaction: any) => total + transaction.value, 0);
        totalExpenses.push(total);
    }

    return totalExpenses;
}