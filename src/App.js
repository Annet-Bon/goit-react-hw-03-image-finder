import { Component } from 'react';
import PropTypes from 'prop-types';

import fetchApi from "./services/Api";

import Searchbar from './components/Searchbar/index';
import ImageGallery from './components/ImageGallery/index';
import Button from './components/Button';
import Loader from "./components/Loader";
import Modal from './components/Modal';

export default class App extends Component {

	state = {
		pictures: [],
		largeImageUrl: "",
		searchQuery: "",
		isLoading: false,
		showModal: false,
		shouldScroll: false,
		page: 1,
		error: null,
	};

	static propTypes = {
		pictures: PropTypes.arrayOf(
			PropTypes.shape({
					id: PropTypes.string,
					largeImageUrl: PropTypes.string,
			})
		),
		page: PropTypes.number,
		searchQuery: PropTypes.string,
		onButtonClick: PropTypes.func,
		toggleModal: PropTypes.func,
		onSearchFormSubmit: PropTypes.func,
		fetchPictures: PropTypes.func,
	};

	componentDidUpdate(prevProps, prevState) {
		const prevQuery = prevState.searchQuery;
		const nextQuery = this.state.searchQuery;

		if (prevQuery !== nextQuery) {
			this.fetchPictures();
		}

		if (this.state.shouldScroll === true) {
			window.scrollTo({
				top: document.documentElement.scrollHeight,
				behavior: "smooth",
			});
		}
	}

	fetchPictures = () => {
		const { searchQuery, page } = this.state;

		this.setState({ isLoading: true });

		fetchApi.fetchPicturesWithQuery(searchQuery, page)
			.then((pictures) =>
				this.setState((prevState) => ({
					pictures: [...prevState.pictures, ...pictures],
					page: prevState.page + 1,
				})))
			.catch((error) => this.setState({ error }))
			.finally(() => this.setState({ isLoading: false }));
	};

	onSearchFormSubmit = (query) => {
		this.setState({
			searchQuery: query,
			page: 1,
			pictures: [],
		});
	};

	toggleModal = (largeImageUrl) => {
		this.setState({ largeImageUrl: largeImageUrl });
		this.setState({ shouldScroll: false });
		this.setState({ showModal: !this.state.showModal });
	};

	onButtonClick = () => {
		this.fetchPictures();
		if (this.state.page > 1) {
			this.setState({ shouldScroll: true });
		}
	};

	render() {
		const { pictures, isLoading, showModal, largeImageUrl } = this.state;

		return (
			<>
				<Searchbar onSubmit={this.onSearchFormSubmit}></Searchbar>
				{pictures.length > 0 && (
					<ImageGallery
						pictures={pictures}
						onClose={this.toggleModal}
					/>
				)}
				{showModal && (
					<Modal
						onClose={this.toggleModal}
						largeImageUrl={largeImageUrl}
					/>
				)}
				{pictures.length > 0 && !isLoading && (
					<Button
						type="button"
						onClick={this.onButtonClick}
					/>
				)}
				{isLoading && <Loader />}
			</>
		);
	}
}