import { createSignal, Match, onCleanup, Show, Switch } from 'solid-js';
import styles from './styles.module.css'
import { formatCurrency } from '../../functions/formatCurrency';
import { useGlobalContext } from '../../context/GlobalContext';
export const Empty = () => {

    const [value, setValue] = createSignal<string>('');
    const [loading, setLoading] = createSignal<boolean>(false);

    const { setList } = useGlobalContext();

    const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        setValue(formatCurrency(target.value));
    };

    const handleCreateList = () => {
        setLoading(true);
        const list = {
            salary: Number(value().replace('R$', '').replace('.', '').replace(',', '.')),
            transactions: []
        }

        const timer = setTimeout(() => {
            console.log("estou sendo chamado")
            setLoading(false);
            setList(list);
        }, 1500)

        onCleanup(() => clearTimeout(timer));

    }

    return (
        <div class={styles.container}>
            <img src='/src/assets/logo.png' width={250} height={250} class={styles.logo} />
            <h1 class={styles.title}>Vamos <br /> Começar</h1>
            <p class={styles.paragraph}>
                Primeiro precisamos saber o valor do seu salário mensal
            </p>
            <div class={styles.inputWrapper}>
                <input oninput={handleInput} value={value()} placeholder=' ' type="text" id='salary' name='salary' />
                <label for="salary">Informe o valor</label>
            </div>
            <Show
                when={value() !== ''}
                fallback={null}
            >
                <button onclick={handleCreateList} class={styles.submitButton}>
                    <Switch fallback={<span>Continuar</span>}>
                        <Match when={loading()}>
                            <span>Carregando...</span>
                        </Match>
                    </Switch>
                </button>
            </Show>
        </div>
    )
}
