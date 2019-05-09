import React from 'react';

interface IErrorDialogProps {
    message: string;
}

export default class ErrorDialog extends React.Component<
    IErrorDialogProps,
    {}
> {
    render() {
        return this.props.message;
    }
}
