class AdminCohortDateRow extends React.Component {

  componentDidMount() {
    let datepicker = $('#datetimepicker' + this.props.Id)

    datepicker.datetimepicker({
      format: 'MMMM DD, YYYY',
      toolbarPlacement: 'bottom',
      widgetPositioning: {horizontal: 'left', vertical: 'bottom'},
      icons: {today: 'glyphicon glyphicon-time'},
      showClose: true,
      showTodayButton: true
    })
      .on('dp.change', (event) => {
        event.target.value = moment(event.date._d).format('YYYY-MM-DD')
        this.props.handleChange(this.props.Param, event)
    }.bind(this))
  }

  render() {
    return(
      <div className='form-row'>
        <span className='input-label'>{this.props.Text}</span>

        <input className={'readOnly' + this.props.readOnly + '-admin'}
          id={'datetimepicker' + this.props.Id}
          readOnly={this.props.readOnly}
          value={moment(this.props.Value).format('MMMM DD, YYYY')}
          type='text'
          onChange={this.props.handleChange.bind(this, this.props.Param)} />

      </div>
    )
  }
}