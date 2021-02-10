import axios from "axios";

const fetchPicturesWithQuery = (searchQuery, page = 1) => {
	return axios
		.get(
			`https://pixabay.com/api/?key=19267083-f7a103736789b336d201af38a&q=${searchQuery}&image_type=photo&per_page=12&page=${page}`
		)
		.then((response) => response.data.hits);
};

export default {
	fetchPicturesWithQuery,
};