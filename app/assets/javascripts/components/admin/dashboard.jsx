class AdminDashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cohorts: {},
      cohortInFocus: {},
      appInFocus: {},
    }
  }

  componentWillMount(){
    let cohorts = JSON.parse(this.props.cohorts)

    this.setState( {cohorts: cohorts} )
    this.setState( {cohortInFocus: cohorts[0]} )
    this.setState( {appInFocus: cohorts[0].applications[0]})
  }

  handleChange(action) {
    this.setState(action)
  }

  render() {
    debugger
    return (
      <main className='admin-frame'>
        <CohortsSection
          cohorts={this.state.cohorts}
          cohort={this.state.cohortInFocus}
          handleChange={this.handleChange.bind(this)} />
        <ApplicationSection
          cohort={this.state.cohortInFocus}
          app={this.state.appInFocus}
          handleChange={this.handleChange.bind(this)} />
      </main>
    )
  }
}