class AdminCohortReviewerSearch extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      search: "",
      allReviewers: []
    }
  }

  componentDidMount() {
    this.getAllReviewers()
  }

  handleChange(key, event) {
    this.setState( {[key]: event.target.value} )
  }

  filteredSearch() {
    let search = this.state.search.toLowerCase()
    let length = search.length

    return this.state.allReviewers.filter((reviewer) => {
      return (reviewer.name.toLowerCase().substr(0, length) == search)
    })
  }

  getAllReviewers() {
    ping('/api/v1/admin/reviewers', this.options('GET'))
      .then((response) => {
        response.json().then((json) => {

        this.setState({allReviewers: json})
        })
      })
      .catch((error) => {
      })
  }

  options(verb, body = {}) {
    return {
      body: body,
      method: verb,
      headers: { 'Authorization': this.props.authorization,
                 'Content-Type': "application/json" }
    }
  }
  
  render() {
    return(
      <section className='reviewer-search-box'>
        <h3>Unselected Reviewers</h3>
        <section className='search-input'>
          <input type='text'
            readOnly={this.props.readOnly}
            className={['readOnly', this.props.readOnly].join('')}
            placeholder={"Search for a reviewer"}
            onChange={this.handleChange.bind(this, 'search')} />
        </section>

        <section className='search-results'>
          {this.filteredSearch().map((reviewer, i) => {
            return <AdminCohortReviewerSearchRow key={i}
              reviewer={reviewer}
              cohort={this.props.cohort}
              readOnly={this.props.readOnly}
              handleAction={this.props.handleAction}
              authorization={this.props.authorization}
            />
          })}
        </section>
      </section>
    )
  }
}