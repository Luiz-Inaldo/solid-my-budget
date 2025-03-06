import { Match, Switch } from 'solid-js';
import { useGlobalContext } from '../../context/GlobalContext';
import styles from './styles.module.css';
import { ArrowDown, ArrowUp } from 'lucide-solid';
import { formatNumber } from '../../functions/formatNumber';
import { returnCurrentMonth } from '../../functions/returnMonth';
import { CATEGORIES } from '../../constants/categories';
const Transactions = () => {

    const { list } = useGlobalContext();

    return (
        <div class={styles["transactions-wrapper"]}>
            <h2 class={styles.title}>Minhas transações</h2>
            <div class={styles.transactions}>
                {list()?.transactions.sort((a: any, b: any) => b.date - a.date).map((transaction: any, index: number) => (
                    <div class={styles.transaction}>
                        <div>
                            {CATEGORIES.find((category: any) => category.name === transaction.category)?.icon({ size: 20 })}
                        </div>
                        <div>
                            <h3>{transaction.name}</h3>
                            <div>
                                <Switch fallback={null}>
                                    <Match when={transaction.type === 'entrada'}>
                                        <div>
                                            <ArrowUp color='var(--green)' size={16} />
                                        </div>
                                    </Match>
                                    <Match when={transaction.type === 'saida'}>
                                        <div>
                                            <ArrowDown color='var(--red)' size={16} />
                                        </div>
                                    </Match>
                                </Switch>
                                <p>{formatNumber(transaction.value)}</p>
                            </div>
                        </div>
                        <div>
                            <p>
                                {transaction.date?.split('T')[0].split('-')[2]}/{returnCurrentMonth(transaction.date)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Transactions