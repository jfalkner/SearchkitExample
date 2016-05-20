// search using the index
const sk = new Searchkit.SearchkitManager(Window.App.host + "lims_subreadsets_v2/lims_subreadset_v2/")

// import Searchkit ReactJS components used by this page
const Hits = Searchkit.Hits
const NoHits = Searchkit.NoHits
const Pagination = Searchkit.Pagination

// utility code for pretty-printing
const formatDate = Window.App.formatDate

// renders a table with a row per search results (aka "hit")
class SubreadsetTable extends React.Component {

    render(){
        const { hits } = this.props
        const hit = hits[0]
        return (
            <div style={{width: '100%', boxSizing: 'border-box', padding: 8}}>
            <table className="sk-table sk-table-striped" style={{width: '100%', boxSizing: 'border-box'}}>
            <thead>
                <tr>
                <th></th>
                <th>UUID</th>
                <th>Runcode</th>
                <th>Created At</th>
                <th>Path</th>
                </tr>
            </thead>
            <tbody>
            { hits.map(hit => {
                return (
                <tr key={hit._id}>
                    <td style={{margin: 0, padding: 0, width: 40}}></td>
                    <td>{hit._source.uuid}</td>
                    <td>{hit._source.runcode}</td>
                    <td>{formatDate(hit._source.created_at)}</td>
                    <td><a href="{hit._source.path}" title={hit._source.path}>...</a></td>
                </tr>
            )})}
            </tbody>
            </table>
            </div>
    )}
}

// makes the main div with a search box and display for hits, nohits and pagination
class SubreadsetSearch extends React.Component {
    render() {
        const SearchkitProvider = Searchkit.SearchkitProvider;
        const Searchbox = Searchkit.SearchBox;
        return (<div>

            <SearchkitProvider searchkit={sk}>
            <div className="search">
            <div className="search__query">
            <Searchbox searchOnChange={true} prefixQueryFields={["uuid^1"]} />
            </div>
            <div className="search__results">
            <Hits hitsPerPage={10} sourceFilter={["uuid", "runcode", "created_at", "path"]} listComponent={SubreadsetTable}/>
            <NoHits translations={{
            "NoHits.NoResultsFound":"No matches found for {query}",
                "NoHits.DidYouMean":"Search for {suggestion}",
                "NoHits.SearchWithoutFilters":"Search for {query} without filters"
        }} suggestionsField="uuid"/>
            <Pagination showNumbers={true}/>
            </div>
            </div>
            </SearchkitProvider>

            </div>);
    }
}

// there is no composite view yet. just show subreadset search as the default
ReactDOM.render(<SubreadsetSearch />, document.getElementById('app'));