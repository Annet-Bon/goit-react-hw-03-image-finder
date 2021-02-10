import styles from './button.module.css';

export default function Button ({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={styles.button}
        >
            <span>Load more</span>
        </button>
    );
}