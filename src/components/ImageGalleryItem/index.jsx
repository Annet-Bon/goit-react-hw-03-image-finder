import styles from './imageGalleryItem.module.css';

export default function ImageGalleryItem ({ imageUrl, onClick }) {
    return (
        <li className={styles.imageGalleryItem}>
            <img
                src={imageUrl}
                alt=""
                onClick={onClick}
                className={styles.itemImage}
            />
        </li>
    );
}