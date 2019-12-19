import React, { Component } from 'react';
import stockSymbols from '../json/stock-symbols.json';
import Autosuggest from 'react-autosuggest';


function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === "") {
        return [];
    }
    const regex = new RegExp("^" + escapedValue, "i");
    return stockSymbols.filter(symbol => regex.test(symbol["Company Name"]) || regex.test(symbol["Symbol"]));
}
function getSuggestionValue(suggestion) {
    return `${suggestion["Symbol"]} | ${suggestion["Company Name"]}`
}
function renderSuggestion(suggestion) {
    return (
        <span>{`${suggestion["Symbol"]} | ${suggestion["Company Name"]}`}</span>
    );
}

export default class AutoSuggestComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: []
        };
    }
    componentDidMount() {
        this.input.focus();
    }
    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    storeInputReference = autosuggest => {
        if (autosuggest !== null) {
            this.input = autosuggest.input;
        }
    };
    suggestionSelected = (event, { suggestionValue }) => {
        this.props.getLatestStockData(suggestionValue.split("|")[0].trim())
    }
    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Search Ticker or Company Name...",
            value,
            onChange: this.onChange
        };
        return (

            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                onSuggestionSelected={this.suggestionSelected}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                ref={this.storeInputReference} />

        );
    }
}
