import { Component } from "react";
import PropTypes from 'prop-types';

import styles from './imageGallery.module.css';

import ImageGalleryItem from '../ImageGalleryItem'

export default class ImageGallery extends Component {

	static propTypes = {
		onClick: PropTypes.func,
	};

	onClick = (largeImageURL) => {
		this.props.onClose(largeImageURL);
	};

	render() {
		const { pictures } = this.props;

		return (
			<ul className={styles.imageGallery}>
				{pictures.map(({ id, webformatURL, largeImageURL }) => (
                    <ImageGalleryItem
                        key={id}
                        id={id}
                        imageUrl={webformatURL}
                        onClick={() => this.onClick(largeImageURL)}
					/>
				))}
			</ul>
		);
	}
}