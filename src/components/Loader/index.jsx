import { Component } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class LoaderSpinner extends Component {
	render() {
		return (
			<Loader
			type="BallTriangle"
			color="#3f51b5"
			height={100}
			width={100} />
		);
	}
}