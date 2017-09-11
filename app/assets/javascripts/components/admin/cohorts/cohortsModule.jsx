class CohortsModule extends React.Component {
  render() {
    return (
      <section className='cohorts-frame'>
        {this.sortBy('title').map((cohort, i) => {
          return <CohortModule key={i} cohort={cohort} onClick={this.props.updateApplications}/>
        })}
      </section>
    )
  }

  sortBy(property) {
    let sortBy = property

    debugger
    return this.props.cohorts.sort((a, b) => {
      if (a[sortBy] > b[sortBy])
        return -1;
      if (a[sortBy] < b[sortBy])
        return 1;
      return 0;
    })
  }
}