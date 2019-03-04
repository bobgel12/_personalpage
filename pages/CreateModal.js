import {
	Layout, Menu, Breadcrumb, Icon, Avatar, Button, Drawer
  } from 'antd';
import React from 'react'
  // import WrappedHorizontalLoginForm from '../NewForm.js'

import { Table, Input, InputNumber, Popconfirm, Form, Modal, Radio, Select, Cascader, Card, Collapse } from 'antd';

import { Steps, message } from 'antd';
var _ = require('lodash');
  
// ConditionForm Form
	const ActionFormNew = Form.create({ name: 'action' })(
		class extends React.Component {
			constructor(props){
				super(props)
				this.state = {
					ActionKey: [],
					ActionType: ''
				}
			}
	
			handleChangeActionType = (ActionType) => { 
				let selectedActionType = _.find(this.props.rules.conditionType, {'NAME': ActionType});
				let ActionKey = this.props.rules.conditionKey.map((Action)=>{
					if (Action.KEY_TYPE.toUpperCase() == selectedActionType.NAME.toUpperCase()){
						return Action
					} else null
				})
				ActionKey = _.without(ActionKey, undefined)
				this.setState({ActionKey, ActionType})
			}
			// Save button when edit
			handleSave = () => {
				const form = this.props.form;
				form.validateFields((err, values) => {
				  if (err) {
					return;
				  }
				this.props.handleSave(values, this.props)
				this.setState({ActionKey:[], ActionType: ''})
				})
			}
			ActionType = () => {
				const { getFieldDecorator } = this.props.form;
				const { rules } = this.props;
				let menu = rules.conditionType.map(type => {
					if (type.TYPE.toUpperCase() === 'ACTION') {
						return (<Select.Option value={type.NAME} key={type.NAME}>{type.NAME}</Select.Option>)
					} else return null
				})
				menu = _.without(menu, undefined)
				return (
					<Form.Item label='Action Type'>
					{getFieldDecorator('CONDITION_TYPE', {
					  rules: [{
						required: true, message: 'Please Input Action Type',
					}],
					// initialValue: this.props.currentObject.Action_TYPE || ''
					})(<Select type="secondary" onChange={this.handleChangeActionType}>{menu}</Select>)}
					</Form.Item>
					)
			}
			// Put it here so it can fix the problems of only input 1 char
			FormList = () => {
				const { getFieldDecorator } = this.props.form;
				let value = this.state.ActionKey.map((ActionKey, index) => {
					return (
						<div key={ActionKey.KEY_NAME+String(index)}>
							<Form.Item label={ActionKey.KEY_NAME} key={ActionKey.KEY_NAME}>
								{
									getFieldDecorator(`${ActionKey.KEY_NAME}`,
									{
								  rules: [{
									required: true, message: `Please input ${ActionKey.KEY_NAME}`,
								  }],
								//   initialValue: oldprops.currentObject[ActionKey.KEY_NAME] || '',
								})(<Input/>)}
							</Form.Item>
						</div>
					)
				})
				return value
			}		
			render(){
				const { getFieldDecorator } = this.props.form;
				const { rules } = this.props;
					return (
						<div>
							<this.ActionType/>
							<this.FormList/>
							<Form.Item>
								<Button
								type="primary"
								htmlType="submit"
								onClick={this.handleSave}
								// disabled={hasErrors(getFieldsError())}
								>
								Save Action
								</Button>
							</Form.Item>
						</div>
					)
			}
		})
	
// Rules Form
const RulesFormNew = Form.create({ name: 'rules' })(
	class extends React.Component {
		constructor(props){
			super(props)
		}

		// Save button when edit
		handleSave = () => {
			const form = this.props.form;
			form.validateFields((err, values) => {
			  if (err) {
				return;
			  }
			this.props.handleSave(values, this.props)
			this.setState({ActionKey:[], ActionType: ''})
			})
		}

		render(){
			const { getFieldDecorator } = this.props.form;
			const { rules } = this.props;
				return (
					<div>
						<Form.Item label='Rule Type' key='Rule Type'>
							{getFieldDecorator('RULE_TYPE', {
							  rules: [{
								required: true, message: 'Please Select Rule Type',
							  }],
							})(
								<Select placeholder="Please Select Rule Type">
								{
									rules.ruleType.map((type, index) => {
										return (<Select.Option value={type.NAME} key={type.NAME}>{type.NAME}</Select.Option>)
									})
								}
								</Select>
							)}
						</Form.Item>
						<Form.Item label='Rule Tile' key='Rule Tile'>
							{getFieldDecorator('ruleTitle', {
							  rules: [{
								required: true, message: 'Please input Rule Tile',
							  }],
							})(<Input />)}
						</Form.Item>
						<Form.Item label='Rule Description' key='Rule Description'>
							{getFieldDecorator('ruleDescription', {
							  rules: [{
								required: true, message: 'Please Input Rule Description',
							  }],
							})(<Input />)}
						</Form.Item>
						<Form.Item>
							<Button
							type="primary"
							htmlType="submit"
							onClick={this.handleSave}
							// disabled={hasErrors(getFieldsError())}
							>
							Save Rules
							</Button>
						</Form.Item>
					</div>
			)
		}
	})


	// ConditionForm Form
const ConditionFormNew = Form.create({ name: 'rules' })(
	class extends React.Component {
		constructor(props){
			super(props)
			this.state = {
				conditionKey: [],
				conditionType: ''
			}
		}

		handleChangeConditionType = (conditionType) => { 
			let selectedconditionType = _.find(this.props.rules.conditionType, {'NAME': conditionType});
			let conditionKey = this.props.rules.conditionKey.map((condition)=>{
				if (condition.KEY_TYPE.toUpperCase() == selectedconditionType.NAME.toUpperCase() && condition.KEY_DIRECTION.toUpperCase() == selectedconditionType.TYPE.toUpperCase()){
					return condition
				} else null
			})
			conditionKey = _.without(conditionKey, undefined)
			this.setState({conditionKey, conditionType})
		}
		// Save button when edit
		handleSave = () => {
			const form = this.props.form;
			form.validateFields((err, values) => {
			  if (err) {
				return;
			  }
			this.props.handleSave(values, this.props)
			this.setState({conditionKey:[], conditionType: ''})
			})
		}
		ConditionType = () => {
			const { getFieldDecorator } = this.props.form;
			const { rules } = this.props;
			let menu = rules.conditionType.map(type => {
				if (type.TYPE.toUpperCase() === 'CONDITION') {
					return (<Select.Option value={type.NAME} key={type.NAME}>{type.NAME}</Select.Option>)
				} else return null
			})
			menu = _.without(menu, undefined)
			return (
				<Form.Item label='Condition Type'>
				{getFieldDecorator('CONDITION_TYPE', {
				  rules: [{
					required: true, message: 'Please Input Condition Type',
				}],
				// initialValue: this.props.currentObject.CONDITION_TYPE || ''
				})(<Select type="secondary" onChange={this.handleChangeConditionType}>{menu}</Select>)}
				</Form.Item>
				)
		}
		// Put it here so it can fix the problems of only input 1 char
		FormList = () => {
			const { getFieldDecorator } = this.props.form;
			let value = this.state.conditionKey.map((conditionKey, index) => {
				return (
					<div key={conditionKey.KEY_NAME+String(index)}>
						<Form.Item label={conditionKey.KEY_NAME} key={conditionKey.KEY_NAME}>
							{
								getFieldDecorator(`${conditionKey.KEY_NAME}`,
								{
							  rules: [{
								required: true, message: `Please input ${conditionKey.KEY_NAME}`,
							  }],
							//   initialValue: oldprops.currentObject[conditionKey.KEY_NAME] || '',
							})(<Input/>)}
						</Form.Item>
					</div>
				)
			})
			return value
		}		
		render(){
			const { getFieldDecorator } = this.props.form;
			const { rules } = this.props;
				return (
					<div>
						<this.ConditionType/>
						<this.FormList/>
						<Form.Item>
							<Button
							type="primary"
							htmlType="submit"
							onClick={this.handleSave}
							// disabled={hasErrors(getFieldsError())}
							>
							Save Condition
							</Button>
						</Form.Item>
					</div>
				)
		}
	})

  class CreateModal extends React.Component {
		  constructor(props){
			  super(props)
			  this.state = {
				  rulesInfo: {},
				  count: 0,
				  countAction: 0,
				  current: 0,
				  currentKeyColapse: 0,
				  conditionList: [],
				  conditionListData: {},
				  ActionList: [],
				  ActionListData: {},
				  conditionKey: [],
				  working: false,
				  steps: [{
					  title: 'Rules',
					  content: 
					  <div></div>
					  ,
					}, {
					  title: 'Condition',
					  content: 
					  <div></div>
					  ,
					}, {
					  title: 'Action',
					  content: 
					  <div></div>
					  ,
					}],
				};
				
			  }
			  
		  next() {
			  const current = this.state.current + 1;
			  this.setState({ current });
		  }
		  
		  prev() {
			  const current = this.state.current - 1;
			  this.setState({ current });
		  }
			  
		  Step = Steps.Step;


		  // CONDITION
		  handleNewCondition = () => {
			this.setState({conditionList: [...this.state.conditionList, {'content': {'rules':this.props.rules, 'updateCondition':this.updateCondition, 'key':this.state.count + 1}, 'key': this.state.count + 1, 'value': {}}]})
			this.setState({count: this.state.count + 1, working: true})
		  }

		  handleRemoveCondition = (key) =>{
			let newlistData =  Object.assign({}, this.state.conditionListData)
			// let currenteditdata =  Object.assign({}, this.state.conditionListData.key.value, values)
			delete newlistData[key]

			this.setState({conditionListData: Object.assign({}, newlistData), working:false, count: this.state.count + 1})
		}

		handleSaveCondition = (values, props) => {
			let newlistData =  Object.assign({}, this.state.conditionListData)
			// let currenteditdata =  Object.assign({}, this.state.conditionListData.key.value, values)
			newlistData[props.keyitem] = values

			this.setState({conditionListData: Object.assign({}, newlistData), working:false, count: this.state.count + 1})
		}

		  Conditions = () => {
			  let ConditionsList = () =>{
				  return (
						Object.keys(this.state.conditionListData).map((conditionKey, index)=> {
						  // let NewCondition = Form.create({ name: `condition${index}` ,onValuesChange: (props, changes, all)=>{updateCondition(index,all)}})(ConditionForm)
						  let headerText = `Condition ${index+1}`
						  return (
								  <div key={index}>
									<Popconfirm
											title="Sure to delete?"
											onConfirm={() => this.handleRemoveCondition(conditionKey)}
											>
											<a>Delete</a>
									</Popconfirm>
											<a style = {{marginLeft:10}}>Edit</a>
											<p>{headerText}: {this.state.conditionListData[conditionKey].CONDITION_TYPE}</p>
								  </div>
						  )
					  })
				  )
			  }
			return(
				  <div>
					  {/* <Button type="primary" onClick={this.handleNewCondition} disabled={this.state.working}>New Condition</Button> */}
					  <ConditionsList/>
					  <ConditionFormNew visible={this.state.working} rules={this.props.rules} keyitem={this.state.count} handleSave = {this.handleSaveCondition}/>
				  </div>
			  )
			}


			// ACTION
			handleNewAction = () => {
			this.setState({ActionList: [...this.state.ActionList, {'content': {'rules':this.props.rules, 'updateAction':this.updateAction, 'key':this.state.countAction + 1}, 'key': this.state.countAction + 1, 'value': {}}]})
			this.setState({countAction: this.state.countAction + 1, working: true})
		  }

		  handleRemoveAction = (key) =>{
			let newlistData =  Object.assign({}, this.state.ActionListData)
			// let currenteditdata =  Object.assign({}, this.state.ActionListData.key.value, values)
			delete newlistData[key]

			this.setState({ActionListData: Object.assign({}, newlistData), working:false, countAction: this.state.countAction + 1})
		}

		handleSaveAction = (values, props) => {
			let newlistData =  Object.assign({}, this.state.ActionListData)
			// let currenteditdata =  Object.assign({}, this.state.ActionListData.key.value, values)
			newlistData[props.keyitem] = values

			this.setState({ActionListData: Object.assign({}, newlistData), working:false, countAction: this.state.countAction + 1})
		}

		  Actions = () => {
			  let ActionsList = () =>{
				  return (
						Object.keys(this.state.ActionListData).map((ActionKey, index)=> {
						  // let NewAction = Form.create({ name: `Action${index}` ,onValuesChange: (props, changes, all)=>{updateAction(index,all)}})(ActionForm)
						  let headerText = `Action ${index+1}`
						  return (
								  <div key={index}>
									<Popconfirm
											title="Sure to delete?"
											onConfirm={() => this.handleRemoveAction(ActionKey)}
											>
											<a>Delete</a>
									</Popconfirm>
											<a style = {{marginLeft:10}}>Edit</a>
											<p>{headerText}: {this.state.ActionListData[ActionKey].CONDITION_TYPE}</p>
								  </div>
						  )
					  })
				  )
			  }
			return(
				  <div>
					  {/* <Button type="primary" onClick={this.handleNewAction} disabled={this.state.working}>New Action</Button> */}
					  <ActionsList/>
					  <ActionFormNew visible={this.state.working} rules={this.props.rules} keyitem={this.state.countAction} handleSave = {this.handleSaveAction}/>
				  </div>
			  )
			}



		handleSaveRules = (values, props) => {
			this.setState({rulesInfo: Object.assign({}, values)})
		}

		handleSaveRules = (values, props) => {
			this.setState({rulesInfo: Object.assign({}, values)})
		}

		onCreate = () => {
			message.success('Processing complete!')
			// ActionList = []
			// ConditionList = []
			let ActionList = Object.keys(this.state.ActionListData).map((Action)=> {
				return this.state.ActionListData[Action]
			})
			let ConditionList = Object.keys(this.state.conditionListData).map((Condition)=> {
				return this.state.conditionListData[Condition]
			})
			let newrule = {
				"ruleName": this.state.rulesInfo.ruleTitle,
				"ruleDesc": this.state.rulesInfo.ruleDescription,
				"RULE_TYPE": this.state.rulesInfo.RULE_TYPE,
				"ACTION_LIST": JSON.stringify(ActionList),
				"CONDITION_LIST": JSON.stringify(ConditionList)
			};
		}

	  render() {
		  const {
			  visible, onCancel, form, edit, host, session, currentEditingSensor ,selectSensorType, selectedSensorType , onSave, rules
		  } = this.props;
		  const { current } = this.state;

		  return (
			  <Modal
			  visible={visible}
			  title={edit ? "Edit Rule" : "Create a new Rule"}
			  okText={edit ? "Save" : "Create"}
			  onCancel={onCancel}
			//   onOk={edit ? onSave: onCreate}
			  onOk={edit ? onSave: this.onCreate}
			  >
			  {/* // Put it here so it can fix the problems of only input 1 char */}
			  <div>
				  <Steps current={current} progressDot>
					{this.state.steps.map(item => <this.Step key={item.title} title={item.title} />)}
				  </Steps>
				  <div className="steps-content">
				  </div>
				<Form layout="vertical">
				{
					// current == 0 ? <RulesFormNew rules={this.props.rules}/> : current == 1 ?  <ConditionFormNew rules={this.props.rules}/> : null
					current == 0 ? <RulesFormNew rules={this.props.rules} handleSave = {this.handleSaveRules}/> : current == 1 ?  <this.Conditions/> : <this.Actions/>
				}
				</Form>
				  <div className="steps-action">
				  {
					  current < this.state.steps.length - 1
					  && <Button type="primary" onClick={() => this.next()}>Next</Button>
				  }
				  {
					//   current === this.state.steps.length - 1
					//   && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
				  }
				  {
					  current > 0
					  && (
					  <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
					  Previous
					  </Button>
					  )
				  }
				  </div>
			  </div>
			  </Modal>
		  );
		}
	  }

export default CreateModal