import { Portal } from "solid-js/web"
import { NewTransaction } from "./NewTransaction"
import ResetTransactions from "./ResetTransactions"

export const Modal = (props: { type: string }) => {
    return (
        <Portal>
            <div style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                'background-color': 'rgba(0, 0, 0, 0.25)',
                'z-index': '9999',
                display: 'flex',
                'justify-content': 'center',
                'align-items': 'center',
            }}>
                <div
                    style={{
                        'background-color': 'var(--background-color)',
                        'max-width': '90%',
                        'border-radius': '8px',
                        padding: '24px',
                        display: 'flex',
                        'flex-direction': 'column',
                        gap: '12px'
                    }}
                    class="modal-container animate__animated animate__zoomIn animate__faster"
                >
                    {props.type === 'newTransaction' && <NewTransaction />}
                    {props.type === 'deleteAllTransaction' && <ResetTransactions />}
                </div>
            </div>
        </Portal>
    )
}
