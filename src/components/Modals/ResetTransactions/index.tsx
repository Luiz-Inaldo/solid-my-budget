import { X } from "lucide-solid"
import { useGlobalContext } from "../../../context/GlobalContext";
import { createSignal, Match, onCleanup, Switch } from "solid-js";

//css
import styles from "./styles.module.css"

const ResetTransactions = () => {

    const [loading, setLoading] = createSignal<boolean>(false);

    const { setOpenModalConfigs, setList } = useGlobalContext();

    const handleClose = () => setOpenModalConfigs({ open: false, type: null });

    const handleReset = () => {
        setLoading(true);
        localStorage.removeItem('expenses_list');

        const timeout = setTimeout(() => {
            setLoading(false);
            setList(null);
            setOpenModalConfigs({ open: false, type: null });
        }, 1500)

        onCleanup(() => {
            clearTimeout(timeout);
        })
    }

    return (
        <div style={{ position: 'relative' }}>
            <span onclick={handleClose} class={styles["close-button"]}>
                <X size={16} />
            </span>

            <h2 class={styles.title}>Limpeza de transações</h2>
            <p class={styles.description}>Tem certeza que deseja limpar todas as transações?</p>

            <div class={styles.actions}>
                <button onclick={handleReset} id={styles["confirm-button"]}>
                    <Switch fallback={<span>Aguarde...</span>}>
                        <Match when={!loading()}>
                            <span>Sim, resetar</span>
                        </Match>
                    </Switch>
                </button>
                <button onclick={handleClose} id={styles["cancel-button"]}>Cancelar</button>
            </div>
        </div>
    )
}

export default ResetTransactions