/*
 * @Author: duanlinlin 
 * @Date: 2019-01-30 16:52:00 
 * @Last Modified by: duanlinlin
 * @Last Modified time: 2019-02-16 18:56:05
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../scss/Description.scss'
import SingleFeature from './SingleFeature'
import Fad from './Fad'

const shapeShifter = require('../../../libs/shape-shifter')
let resizeTimer = null;
/**
 * introduce something about project before loging
 *
 * @export
 * @class Description
 * @extends {Component}
 */
export class Description extends Component {
	constructor(props) {
		super(props);
		this.state = {
			featureComponentDom: null,
			isShowTitle:false,
		}
	}
	componentWillUpdate() {
		// this.props.page === 2 && this.createCanvasEffect();
	}
	componentWillUnmount() {
		resizeTimer && clearTimeout(resizeTimer)
	}
	//create the effect of shape-shifter
	createCanvasEffect() {
		const container = document.querySelectorAll('.description-canvas-container')[0];
		shapeShifter.init(container, "Welcome|To|Small|Black|House!");
		resizeTimer = setTimeout(() => {
			shapeShifter.UI.reset()
			this.setState({ featureComponentDom: null,isShowTitle:true });
			this.props.page === 2 && this.dynamicShowFeature();
		}, 8000)
	}
	//clear Feature Content
	clearFeatureContent(){
		this.setState({
			featureComponentDom:null,
			isShowTitle:false
		})
		
	}
	//dynamic create feature content
	dynamicShowFeature() {
		this.setState({
			featureComponentDom:
				(<Fad>
					{this.getSingleFeatureComponents()}
				</Fad>)
		})
	}
	//get feature dom according to data
	getSingleFeatureComponents() {
		const descriptionInfo = this.props.descriptionInfo || [];
		const SingleFeatureComponents = descriptionInfo.feature.map((single,idx) =>
			(
				<SingleFeature key={single.title} iconType={single.iconType} title={single.title} detailContent={single.detailContent} />
			)
		)
		return SingleFeatureComponents
	}
	render() {
		const class_name = `entry-description ${this.props.page === 2 ? 'active' : ''}`
		const descriptionInfo = this.props.descriptionInfo || {title:'',content:''};
		const titleClass = `feature-simply-introduction ${this.state.isShowTitle?'show':''}`
		return (
			<div className={class_name}>
				<div className="description-canvas-area">
					<canvas className="description-canvas-container"></canvas>
				</div>
				<div className="house-feature">
					<div className={titleClass}>
						<span className="title">{descriptionInfo.title}</span>
						<span className="content">{descriptionInfo.content}</span>
					</div>
					<div className="feature-detail-introduction">
						{this.state.featureComponentDom}
					</div>
				</div>
			</div>
		)
	}
}
Description.defaultProps = {
	page: 2
}
Description.propTypes = {
	page: PropTypes.number
}
export default Description
