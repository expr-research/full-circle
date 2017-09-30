class StudentDashboard extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      application: {},
      cohort: {}
    }

    this.user = JSON.parse(this.props.user)
    this.authorization = 'Bearer ' + this.props.authorization
  }

  componentWillMount(){
    let cohort = JSON.parse(this.props.cohort)
    let application = JSON.parse(this.props.application)

    debugger
    this.setState({
      cohort: cohort,
      application: application
    })
  }

  handleChange(action) {
    this.setState(action)
  }

  render() {
    let page = this.routing()

    return (
      <main className='main-vert-frame'>
        <Header user={this.user} />
        <section className='student'>
          { page }
        </section>
      </main>
    )
  }

  routing() {
    if (this.state.cohort == null) {
      return <NotAcceptingApplications />
    } else {
      if (this.state.application) {
        return <StudentApplicationSection
          application={this.state.application}
          cohort={this.state.cohort}
          user={this.user}
          authorization={this.authorization} />
      } else {
        return <StudentConfirmCohort
          cohort={this.state.cohort}
          newApplication={this.newApplication.bind(this)} />
      }
    }
  }

  newApplication() {
    let params = `?cohort_id=${this.state.cohort["id"]}`

    let options = {
      method: 'POST',
      headers: { 'Authorization': this.authorization }
    }

    fetch('/api/v1/student/applications' + params, options)
      .then((data) => {
        return data.json()
      })
      .then((json) => {
        this.handleChange({ application: json })
      })
  }
}