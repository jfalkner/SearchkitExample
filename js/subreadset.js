// search using the index
const sk = new Searchkit.SearchkitManager(Window.App.host + "lims_subreadsets_v2/lims_subreadset_v2/")

// import Searchkit ReactJS components used by this page
const Hits = Searchkit.Hits
const NoHits = Searchkit.NoHits
const Pagination = Searchkit.Pagination

// utility code for pretty-printing
const formatDate = Window.App.formatDate
const naIfBlank = Window.App.naIfBlank

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
                    <th>UUID</th>
                    <th>Runcode</th>
                    <th>Created</th>
                    <th><a title="Instrument">Inst.</a></th>
                    <th>Sample</th>
                    <th>Path</th>
                    <th>Context</th>
                    <th>ICS</th>
                    <th>CA</th>
                </tr>
            </thead>
            <tbody>
            { hits.map(hit => {
                return (
                <tr key={hit._id}>
                    <td>{hit._source.uuid.substring(0, 5)}<super><a href={hit._source.uuid} title={hit._source.uuid}>*</a></super></td>
                    <td>{hit._source.runcode}</td>
                    <td>{formatDate(hit._source.created_at)}</td>
                    <td><a title={hit._source.inst_id}>{hit._source.inst_name}</a></td>
                    <td>{hit._source.sample_name}</td>
                    <td><a href={hit._source.path} title={hit._source.path}>...</a></td>
                    <td>{hit._source.context}</td>
                    <td>{naIfBlank(hit._source.ics_version)}</td>
                    <td>{naIfBlank(hit._source.pa_version)}</td>
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
        return (
            <div>
                <SearchkitProvider searchkit={sk}>
                    <div className="search">
                        <div className="search__query">
                            <div><img id="logo" src="images/lims_logo.svg"/></div>
                            <Searchbox searchOnChange={true} prefixQueryFields={["uuid^1"]} />
                            <div id="examples"><a href="https://github.com/jfalkner/SearchkitExample/blob/master/README.md">?</a></div>
                        </div>
                        <div className="search__results">
                            <Hits hitsPerPage={10} sourceFilter={["uuid", "runcode", "created_at", "inst_id", "inst_name", "path", "context", "sample_name", "pa_version", "ics_version"]} listComponent={SubreadsetTable}/>
                            <NoHits translations={{
                                "NoHits.NoResultsFound" : "No matches found for {query}",
                                "NoHits.DidYouMean" : "Search for {suggestion}",
                                "NoHits.SearchWithoutFilters" : "Search for {query} without filters"
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