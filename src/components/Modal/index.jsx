import { Component } from "react";
import styles from './modal.module.css';

export default class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.onKeydown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeydown);
    }

    onKeydown = event => {
        if (event.code === 'Escape') { this.props.onClose() };
    };

    onOverlayClick = () => {
		this.props.onClose();
	};

    render() {
        const { largeImageUrl } = this.props;

        return (
            <div
                className={styles.overlay}
                onClick={this.onOverlayClick}
            >
                <div className={styles.modal}>
                    <img
                        src={largeImageUrl}
                        alt=''
                    />
                </div>
            </div>
        )
    }
}