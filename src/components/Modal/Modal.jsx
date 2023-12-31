import { Component } from 'react';
import style from './Modal.module.css';

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }
    handleKeyDown = event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    };
    handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose();
        }
    };
    render() {
        return (
            <div className={style.overlay} onClick={this.handleBackdropClick}>
                <div className={style.modal}>{this.props.children}</div>
            </div>
        );
    }
    
}