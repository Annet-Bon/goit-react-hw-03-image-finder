import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './searchbar.module.css';

export default class Searchbar extends Component {
    state = {
        inputValue: '',
    };

    static propTypes = {
		onChange: PropTypes.func,
        onSubmit: PropTypes.func
	};

    onChange = (event) => {
        this.setState({ inputValue: event.target.value });
    };

    onSubmit = (event) => {
        event.preventDefault();

		this.props.onSubmit(this.state.inputValue);
		this.setState({ inputValue: "" });
    }

    render() {
        return (
            <header className={styles.searchBar}>
                <form onSubmit={this.onSubmit} className={styles.searchForm}>
                    <button type="submit" className={styles.searchFormBtn}>
                        <span className={styles.searchFormLabel}>Search</span>
                    </button>
                    <input
                        className={styles.searchFormInput}
                        value={this.state.inputValue}
                        onChange={this.onChange}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
    }
}