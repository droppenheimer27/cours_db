import React from 'react';
import { Modal } from 'react-bootstrap';
import { observer } from 'mobx-react';

import { ModalState, modalStore } from '../Stores/ModalStore';

interface IModalDialogProps {
    modalState: ModalState;
}

@observer
export default class ModalDialog extends React.Component<IModalDialogProps, {}> {
    render() {
        const { modalState } = this.props;

        return (
            <Modal show={true} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalState.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalState.body}</Modal.Body>
          </Modal>
        );
    }

    handleClose() {
        modalStore.closeModal();
    }
}