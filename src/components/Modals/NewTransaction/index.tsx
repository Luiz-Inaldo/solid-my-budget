import { createSignal, For } from 'solid-js';
import { useGlobalContext } from '../../../context/GlobalContext';
import styles from './styles.module.css'
import { X } from 'lucide-solid';
import { createForm, requiredValidator, emailValidator } from "solform";
import { formatCurrency } from '../../../functions/formatCurrency';
import { ListProps } from '../../../@types/IGlobalContex';
import { CATEGORIES } from '../../../constants/categories';

interface ITransactionProps {
  name: string;
  value: string;
  type: string;
  category: string
}

export const NewTransaction = () => {

  const [transactionValue, setTransactionValue] = createSignal<string>('');
  const [successMessage, setSuccessMessage] = createSignal<boolean>(false);
  const { setOpenModalConfigs, setList } = useGlobalContext();

  const handleClose = () => setOpenModalConfigs({ open: false, type: null });

  const { register, submit, errors } = createForm<ITransactionProps>({
    validators: {
      name: requiredValidator('Campo obrigatório'),
      value: requiredValidator('Campo obrigatório'),
      type: requiredValidator('Campo obrigatório'),
      category: requiredValidator('Campo obrigatório'),
    },
    onSubmit: (data) => {
      const { name, value, type, category } = data;

      const newTransaction = {
        name,
        value: Number(value.replace('R$', '').replace('.', '').replace(',', '.')),
        type,
        category,
        date: new Date().toISOString()
      }

      setList((prev: ListProps) => {
        return {
          ...prev,
          transactions: [...prev!.transactions, newTransaction]
        } as ListProps
      });

      document.getElementsByTagName('form')[0].reset(); // resetando formulário

      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 2000);
    }
  });

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setTransactionValue(formatCurrency(target.value));
  };

  return (
    <div style={{ position: 'relative' }}>
      <span onclick={handleClose} class={styles["close-button"]}>
        <X size={16} />
      </span>

      <h2 class={styles.title}>Nova Transação</h2>

      <form onsubmit={submit}>

        <div class={styles["form-label-container"]}>
          <label for="name">Digite o nome da transação</label>
          <input type="text" id="name" {...register('name')} />
          {errors.name && <span class={styles['error-message']}>{errors.name}</span>}
        </div>

        <div class={styles["form-label-container"]}>
          <label for="value">Valor da transação</label>
          <input
            value={transactionValue()}
            oninput={handleInput}
            type="text"
            id="value"
            {...register('value')}
          />
          {errors.value && <span class={styles['error-message']}>{errors.name}</span>}
        </div>

        <div class={styles["form-label-container"]}>
          <label for="type">Tipo</label>
          <select {...register('type')}>
            <option value="">Selecione</option>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
          {errors.type && <span class={styles['error-message']}>{errors.name}</span>}
        </div>

        <div class={styles["form-label-container"]}>
          <label for="type">Categoria</label>
          <select {...register('category')}>
            <option value="">Selecione</option>
            <For each={CATEGORIES} fallback={null}>
              {(category) => (
                <option value={category.name}>{category.name}</option>
              )}
            </For>
          </select>
          {errors.type && <span class={styles['error-message']}>{errors.name}</span>}
        </div>

        {successMessage() && <span class={styles['success-message']}>Transação adicionada com sucesso!</span>}

        <button type="submit">Adicionar</button>

      </form>
    </div>
  )
}
