// search using the index
const sk = new Searchkit.SearchkitManager(Window.App.host + "smrtlink_analysis_jobs_v1/smrtlink_analysis_job/")

const Hits = Searchkit.Hits
const NoHits = Searchkit.NoHits
const Pagination = Searchkit.Pagination


class JobTable extends React.Component {


    render(){
        const { hits } = this.props
        const hit = hits[0]
        return (
            <div style={{width: '100%', boxSizing: 'border-box', padding: 8}}>
            <table className="sk-table sk-table-striped" style={{width: '100%', boxSizing: 'border-box'}}>
            <thead>
                <tr>
                <th>UUID</th>
                </tr>
            </thead>
            <tbody>
            { hits.map(hit => {
                return (
                <tr key={hit._id}>
                    <td>{hit._source.job_uuid}</td>
                </tr>
            )})}
            </tbody>
            </table>
            </div>
    )
    }
}

class JobSearch extends React.Component {
    render() {
        const SearchkitProvider = Searchkit.SearchkitProvider;
        const Searchbox = Searchkit.SearchBox;
        return (<div>

            <SearchkitProvider searchkit={sk}>
            <div className="search">
            <div className="search__query">
            <Searchbox searchOnChange={true} prefixQueryFields={["job_uuid^1"]} />
            </div>
            <div className="search__results">
            <Hits hitsPerPage={10} sourceFilter={["job_uuid"]} listComponent={JobTable}/>
            <NoHits translations={{
            "NoHits.NoResultsFound":"No matches found for {query}",
                "NoHits.DidYouMean":"Search for {suggestion}",
                "NoHits.SearchWithoutFilters":"Search for {query} without filters"
        }} suggestionsField="job_uuid"/>
            <Pagination showNumbers={true}/>
            </div>
            </div>
            </SearchkitProvider>

            </div>);
    }
}

ReactDOM.render(<JobSearch />, document.getElementById('jobs'));