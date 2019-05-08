import React from 'react';
import { observer } from 'mobx-react'; 
 
import ModalDialog from './ModalDialog';
import { modalStore, ModalState } from '../Stores/ModalStore';

@observer
export default class ModalDialogContainer extends React.Component<{}, {}> {
    render() {
        return (
            modalStore.modalList.map((modal: ModalState, index: number) => <ModalDialog modalState={modal} key={'_dialog' + index} />)
        );
    }
}