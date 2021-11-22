import React from 'react'
import { Button } from 'semantic-ui-react'
import d3Histogram from '../../utils/d3/histogram'

export default class Histogram extends React.Component {
	constructor() {
		super()

		this.histRef = React.createRef()
		this.histChart = null
	}

	componentDidMount() {
		this.histChart = new d3Histogram(this.histRef.current)
		this.histChart.updateChart()
  }

	render() {
		return (
			<React.Fragment>
      	<div ref={this.histRef}>
      	</div>
				<Button primary onClick={() => this.histChart.updateChart()}>
					Generate
				</Button>
			</React.Fragment>
    )
	}
}
