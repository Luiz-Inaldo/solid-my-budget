import { createSignal, Match, Show, Switch } from 'solid-js'
import styles from './styles.module.css'
import { formatNumber } from '../../functions/formatNumber';
import { TrendingDown, TrendingUp, HandCoins, PiggyBank, Plus, RotateCcw, ChartPie } from 'lucide-solid';
import { Modal } from '../Modals';
import { useGlobalContext } from '../../context/GlobalContext';
import Transactions from '../Transactions';
import { useNavigate } from '@solidjs/router';

const EmptyList = () => {

    const { setOpenModalConfigs } = useGlobalContext();

    const handleOpenModal = () => setOpenModalConfigs({ open: true, type: 'newTransaction' });

    return (
        <div class={styles['empty-list-wrapper']}>
            <img src="/src/assets/empty_list.png" alt="empy list" width={150} />
            <p>Parece que sua lista de transações está vazia.</p>
            <button onclick={handleOpenModal} class={styles['empty-list-button']}>
                <Plus />
                Nova transação
            </button>
        </div>
    )
}

export const Main = () => {

    const { list, openModalConfigs, setOpenModalConfigs, totals } = useGlobalContext();

    const navigate = useNavigate()

    return (
        <>
            <header class={styles.header}>
                <img src="/src/assets/money.svg" alt="pig-bank" width={30} />
                <h1>Controle Financeiro</h1>
            </header>
            <main class={styles.main}>
                <div class={styles.balance}>
                    <div>
                        <p>
                            <HandCoins color='var(--purple)' size={16} />
                            Salário:
                        </p>
                        <p>{formatNumber(list()?.salary)}</p>
                    </div>
                    <div>
                        <p>
                            <TrendingUp color='var(--green)' size={16} />
                            Entradas:
                        </p>
                        <span>{formatNumber(totals()?.entries)}</span>
                    </div>
                    <div>
                        <p>
                            <TrendingDown color='var(--red)' size={16} />
                            Saídas:
                        </p>
                        <span>{formatNumber(totals()?.expenses)}</span>
                    </div>
                    <div>
                        <p>
                            <PiggyBank color='var(--blue)' size={16} />
                            Saldo final:
                        </p>
                        <p>{formatNumber(totals()?.balance)}</p>
                    </div>

                    <Show when={list()!.transactions.length > 0} fallback={null}>
                        <div class={`${styles.actions} animate__animated animate__fadeIn`}>
                            <div onclick={() => setOpenModalConfigs({ open: true, type: 'newTransaction' })}>
                                <button>
                                    <Plus size={20} />
                                </button>
                                <p>Nova transação</p>
                            </div>
                            <div onclick={() => navigate('/graphics')}>
                                <button>
                                    <ChartPie size={20} />
                                </button>
                                <p>Gráficos</p>
                            </div>
                            <div onclick={() => setOpenModalConfigs({ open: true, type: 'deleteAllTransaction' })}>
                                <button>
                                    <RotateCcw size={20} />
                                </button>
                                <p>Resetar transações</p>
                            </div>
                        </div>
                    </Show>
                </div>

                <hr class={styles.separator} />

                <Switch fallback={<EmptyList />}>
                    <Match when={list()!.transactions.length > 0}>
                        <Transactions />
                    </Match>
                </Switch>

                <Show when={openModalConfigs().open}>
                    <Modal type={openModalConfigs().type} />
                </Show>
            </main>
        </>
    )
}
