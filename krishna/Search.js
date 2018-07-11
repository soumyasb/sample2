import React, { Component } from 'react';
// remove this json data import....
import searchDataJson from '../mocks/searchcasebystring.json'

class Search extends Component {
    constructor(props) {
        super(props);

        this.state={
            searchList: searchDataJson.results
        };
    }    

    componentDidMount() {
        // TODO - Call your search api action here....
        const params = new URLSearchParams(this.props.location.search);
        const searchText =  params.get('searchText') ? params.get('searchText') : '';

        //api call - parameter as searchtext

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.search !== nextProps.location.search) {
            // Whenever the search text changes.. call the search api again here...
            // remove the existing line below...
            const params = new URLSearchParams(nextProps.location.search);
            const searchText =  params.get('searchText') ? params.get('searchText') : '';

            //api call - parameter as searchtext

        }

        if (this.props.searchData !== nextProps.searchData) {
            this.setState({ searchList: nextProps.searchData });
        }
    }

    render() {
        // We have the searched results in the state.searchList... I am displaying it ul format for testing.. 
        // we can display the same in the table using the same data... 

        const results = this.state.searchList.map((item, index) => {
            return (<ul key={`sRow${index}`} >
                <li key={`fn${index}`}>{item.firstName}</li>
                <li key={`ln${index}`}>{item.lastName}</li>
                <li key={`dl${index}`}>{item.dlNumber}</li>
            </ul>);
        });

        return (<div><h1> Search page </h1>
            {results}
        </div>
        );
    }
}

export default Search;