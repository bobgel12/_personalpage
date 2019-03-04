	import {
	Layout, Menu, Breadcrumb, Icon, Avatar, Button, Drawer
  } from 'antd';
  import React from 'react'
  // import WrappedHorizontalLoginForm from '../NewForm.js'
  import { Table, Input, InputNumber, Popconfirm, Form, Modal, Radio, Select, Cascader, Card, Collapse } from 'antd';
  import { notification } from 'antd'
  import { Steps, message } from 'antd';
  import CreateModal from './CreateModal'

  import CustomHeader from './CustomHeader'
  const {
	Header, Content, Footer, Sider,
  } = Layout;

  const Panel = Collapse.Panel;
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

//   class CreateModal extends React.Component {
// 		  constructor(props){
// 			  super(props)
// 			  this.state = {
// 				  rulesInfo: {},
// 				  count: 0,
// 				  countAction: 0,
// 				  current: 0,
// 				  currentKeyColapse: 0,
// 				  conditionList: [],
// 				  conditionListData: {},
// 				  ActionList: [],
// 				  ActionListData: {},
// 				  conditionKey: [],
// 				  working: false,
// 				  steps: [{
// 					  title: 'Rules',
// 					  content: 
// 					  <div></div>
// 					  ,
// 					}, {
// 					  title: 'Condition',
// 					  content: 
// 					  <div></div>
// 					  ,
// 					}, {
// 					  title: 'Action',
// 					  content: 
// 					  <div></div>
// 					  ,
// 					}],
// 				};
				
// 			  }
			  
// 		  next() {
// 			  const current = this.state.current + 1;
// 			  this.setState({ current });
// 		  }
		  
// 		  prev() {
// 			  const current = this.state.current - 1;
// 			  this.setState({ current });
// 		  }
			  
// 		  Step = Steps.Step;


// 		  // CONDITION
// 		  handleNewCondition = () => {
// 			this.setState({conditionList: [...this.state.conditionList, {'content': {'rules':this.props.rules, 'updateCondition':this.updateCondition, 'key':this.state.count + 1}, 'key': this.state.count + 1, 'value': {}}]})
// 			this.setState({count: this.state.count + 1, working: true})
// 		  }

// 		  handleRemoveCondition = (key) =>{
// 			let newlistData =  Object.assign({}, this.state.conditionListData)
// 			// let currenteditdata =  Object.assign({}, this.state.conditionListData.key.value, values)
// 			delete newlistData[key]

// 			this.setState({conditionListData: Object.assign({}, newlistData), working:false, count: this.state.count + 1})
// 		}

// 		handleSaveCondition = (values, props) => {
// 			let newlistData =  Object.assign({}, this.state.conditionListData)
// 			// let currenteditdata =  Object.assign({}, this.state.conditionListData.key.value, values)
// 			newlistData[props.keyitem] = values

// 			this.setState({conditionListData: Object.assign({}, newlistData), working:false, count: this.state.count + 1})
// 		}

// 		  Conditions = () => {
// 			  let ConditionsList = () =>{
// 				  return (
// 						Object.keys(this.state.conditionListData).map((conditionKey, index)=> {
// 						  // let NewCondition = Form.create({ name: `condition${index}` ,onValuesChange: (props, changes, all)=>{updateCondition(index,all)}})(ConditionForm)
// 						  let headerText = `Condition ${index+1}`
// 						  return (
// 								  <div key={index}>
// 									<Popconfirm
// 											title="Sure to delete?"
// 											onConfirm={() => this.handleRemoveCondition(conditionKey)}
// 											>
// 											<a>Delete</a>
// 									</Popconfirm>
// 											<a style = {{marginLeft:10}}>Edit</a>
// 											<p>{headerText}: {this.state.conditionListData[conditionKey].CONDITION_TYPE}</p>
// 								  </div>
// 						  )
// 					  })
// 				  )
// 			  }
// 			return(
// 				  <div>
// 					  {/* <Button type="primary" onClick={this.handleNewCondition} disabled={this.state.working}>New Condition</Button> */}
// 					  <ConditionsList/>
// 					  <ConditionFormNew visible={this.state.working} rules={this.props.rules} keyitem={this.state.count} handleSave = {this.handleSaveCondition}/>
// 				  </div>
// 			  )
// 			}


// 			// ACTION
// 			handleNewAction = () => {
// 			this.setState({ActionList: [...this.state.ActionList, {'content': {'rules':this.props.rules, 'updateAction':this.updateAction, 'key':this.state.countAction + 1}, 'key': this.state.countAction + 1, 'value': {}}]})
// 			this.setState({countAction: this.state.countAction + 1, working: true})
// 		  }

// 		  handleRemoveAction = (key) =>{
// 			let newlistData =  Object.assign({}, this.state.ActionListData)
// 			// let currenteditdata =  Object.assign({}, this.state.ActionListData.key.value, values)
// 			delete newlistData[key]

// 			this.setState({ActionListData: Object.assign({}, newlistData), working:false, countAction: this.state.countAction + 1})
// 		}

// 		handleSaveAction = (values, props) => {
// 			let newlistData =  Object.assign({}, this.state.ActionListData)
// 			// let currenteditdata =  Object.assign({}, this.state.ActionListData.key.value, values)
// 			newlistData[props.keyitem] = values

// 			this.setState({ActionListData: Object.assign({}, newlistData), working:false, countAction: this.state.countAction + 1})
// 		}

// 		  Actions = () => {
// 			  let ActionsList = () =>{
// 				  return (
// 						Object.keys(this.state.ActionListData).map((ActionKey, index)=> {
// 						  // let NewAction = Form.create({ name: `Action${index}` ,onValuesChange: (props, changes, all)=>{updateAction(index,all)}})(ActionForm)
// 						  let headerText = `Action ${index+1}`
// 						  return (
// 								  <div key={index}>
// 									<Popconfirm
// 											title="Sure to delete?"
// 											onConfirm={() => this.handleRemoveAction(ActionKey)}
// 											>
// 											<a>Delete</a>
// 									</Popconfirm>
// 											<a style = {{marginLeft:10}}>Edit</a>
// 											<p>{headerText}: {this.state.ActionListData[ActionKey].CONDITION_TYPE}</p>
// 								  </div>
// 						  )
// 					  })
// 				  )
// 			  }
// 			return(
// 				  <div>
// 					  {/* <Button type="primary" onClick={this.handleNewAction} disabled={this.state.working}>New Action</Button> */}
// 					  <ActionsList/>
// 					  <ActionFormNew visible={this.state.working} rules={this.props.rules} keyitem={this.state.countAction} handleSave = {this.handleSaveAction}/>
// 				  </div>
// 			  )
// 			}



// 		handleSaveRules = (values, props) => {
// 			this.setState({rulesInfo: Object.assign({}, values)})
// 		}

// 		handleSaveRules = (values, props) => {
// 			this.setState({rulesInfo: Object.assign({}, values)})
// 		}

// 		onCreate = () => {
// 			message.success('Processing complete!')
// 			// ActionList = []
// 			// ConditionList = []
// 			let ActionList = Object.keys(this.state.ActionListData).map((Action)=> {
// 				return this.state.ActionListData[Action]
// 			})
// 			let ConditionList = Object.keys(this.state.conditionListData).map((Condition)=> {
// 				return this.state.conditionListData[Condition]
// 			})
// 			let newrule = {
// 				"ruleName": this.state.rulesInfo.ruleTitle,
// 				"ruleDesc": this.state.rulesInfo.ruleDescription,
// 				"RULE_TYPE": this.state.rulesInfo.RULE_TYPE,
// 				"ACTION_LIST": JSON.stringify(ActionList),
// 				"CONDITION_LIST": JSON.stringify(ConditionList)
// 			};
// 		}

// 	  render() {
// 		  const {
// 			  visible, onCancel, form, edit, host, session, currentEditingSensor ,selectSensorType, selectedSensorType , onSave, rules
// 		  } = this.props;
// 		  const { current } = this.state;

// 		  return (
// 			  <Modal
// 			  visible={visible}
// 			  title={edit ? "Edit Rule" : "Create a new Rule"}
// 			  okText={edit ? "Save" : "Create"}
// 			  onCancel={onCancel}
// 			//   onOk={edit ? onSave: onCreate}
// 			  onOk={edit ? onSave: this.onCreate}
// 			  >
// 			  {/* // Put it here so it can fix the problems of only input 1 char */}
// 			  <div>
// 				  <Steps current={current} progressDot>
// 					{this.state.steps.map(item => <this.Step key={item.title} title={item.title} />)}
// 				  </Steps>
// 				  <div className="steps-content">
// 				  </div>
// 				<Form layout="vertical">
// 				{
// 					// current == 0 ? <RulesFormNew rules={this.props.rules}/> : current == 1 ?  <ConditionFormNew rules={this.props.rules}/> : null
// 					current == 0 ? <RulesFormNew rules={this.props.rules} handleSave = {this.handleSaveRules}/> : current == 1 ?  <this.Conditions/> : <this.Actions/>
// 				}
// 				</Form>
// 				  <div className="steps-action">
// 				  {
// 					  current < this.state.steps.length - 1
// 					  && <Button type="primary" onClick={() => this.next()}>Next</Button>
// 				  }
// 				  {
// 					//   current === this.state.steps.length - 1
// 					//   && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
// 				  }
// 				  {
// 					  current > 0
// 					  && (
// 					  <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
// 					  Previous
// 					  </Button>
// 					  )
// 				  }
// 				  </div>
// 			  </div>
// 			  </Modal>
// 		  );
// 		}
// 	  }




  class CustomLayout extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			content: '',
			visible: false,
			edit: false,
			rules: {"rule":[{"ID":38,"NAME":"j","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Condition_Type\":\"SQL\",\"Condition\":[{\"Type\":\"table\",\"Operator\":\"=\",\"Value\":\"TestHost\"},{\"Type\":\"table\",\"Operator\":\"=\",\"Value\":\"OrlandoB\"},{\"Type\":\"Column_Filter\",\"Operator\":\"\",\"Value\":\"j\"}]}]","ACTION_LIST":"{\"Action_Type\":\"Email\",\"Action\":[{\"0\":{\"To\":\"h\",\"Subject\":\"o\",\"Body\":\"u\"}}]}","DESCRIPTION":"g","RULE_TYPE":"Calculation Rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":null},{"ID":39,"NAME":"h","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Condition_Type\":\"SQL\",\"Condition\":[{\"Type\":\"table\",\"Operator\":\"=\",\"Value\":\"TestHost\"},{\"Type\":\"table\",\"Operator\":\"=\",\"Value\":\"OrlandoB\"},{\"Type\":\"Column_Filter\",\"Operator\":\"\",\"Value\":\"j\"}]}]","ACTION_LIST":"[{\"Action_Type\":\"Email\",\"Action\":[{\"0\":{\"To\":\"j\",\"Subject\":\"i\",\"Body\":\"g\"}}]}]","DESCRIPTION":"u","RULE_TYPE":"Calculation Rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":null},{"ID":40,"NAME":"j","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Condition_Type\":\"SQL\",\"Condition\":[{\"Type\":\"table\",\"Operator\":\"=\",\"Value\":\"TestHost\"},{\"Type\":\"Column\",\"Operator\":\"=\",\"Value\":\"OrlandoB\"},{\"Type\":\"Column_Filter\",\"Operator\":\">\"}]}]","ACTION_LIST":"[{\"Action_Type\":\"Email\",\"Action\":[null]}]","DESCRIPTION":"k","RULE_TYPE":"Calculation Rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":null},{"ID":41,"NAME":"j","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Condition_Type\":\"SQL\",\"Condition\":[{\"Type\":\"table\",\"Operator\":\"=\",\"Value\":\"TestHost\"},{\"Type\":\"Column\",\"Operator\":\"=\",\"Value\":\"OrlandoB\"},{\"Type\":\"Column_Filter\",\"Operator\":\">\"}]}]","ACTION_LIST":"[{\"Action_Type\":\"Email\",\"Action\":[null]}]","DESCRIPTION":"l","RULE_TYPE":"Calculation Rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":null},{"ID":42,"NAME":"j","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Condition_Type\":\"SQL\",\"Condition\":[{\"Type\":\"table\",\"Operator\":\"=\",\"Value\":\"TestHost\"},{\"Type\":\"Column\",\"Operator\":\"=\",\"Value\":\"OrlandoB\"},{\"Type\":\"Column_Filter\",\"Operator\":\">\"}]}]","ACTION_LIST":"[{\"Action_Type\":\"Email\",\"Action\":[{\"0\":{\"To\":\"h\",\"Subject\":\"o\",\"Body\":\"gf\"}}]}]","DESCRIPTION":"ty","RULE_TYPE":"Calculation Rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":null},{"ID":43,"NAME":"h","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Condition_Type\":\"SQL\",\"Condition\":[{\"Type\":\"table\",\"Operator\":\"=\",\"Value\":\"TestHost\"},{\"Type\":\"Column\",\"Operator\":\"=\",\"Value\":\"OrlandoB\"},{\"Type\":\"Column_Filter\",\"Operator\":\">\"}]}]","ACTION_LIST":"[{\"Action_Type\":\"Email\",\"Action\":[{\"0\":{\"To\":\"kj\",\"Subject\":\"hjf\",\"Body\":\"gf\"}}]}]","DESCRIPTION":"k","RULE_TYPE":"Calculation Rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":null},{"ID":44,"NAME":"h","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Condition_Type\":\"SQL\",\"Condition\":[{\"Type\":\"table\",\"Operator\":\"=\",\"Value\":\"TestHost\"},{\"Type\":\"Column\",\"Operator\":\"=\",\"Value\":\"OrlandoB\"},{\"Type\":\"Column_Filter\",\"Operator\":\">\"}]}]","ACTION_LIST":"[{\"Action_Type\":\"Email\",\"Action\":{}}]","DESCRIPTION":"j","RULE_TYPE":"Calculation Rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":null},{"ID":45,"NAME":"h","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Condition_Type\":\"SQL\",\"Condition\":[{\"Type\":\"table\",\"Operator\":\"=\",\"Value\":\"ENV_RESULTS\"},{\"Type\":\"Column\",\"Operator\":\"=\",\"Value\":\"TMP\"},{\"Type\":\"Column_Filter\",\"Operator\":\">\",\"Value\":\"150\"}]}]","ACTION_LIST":"[{\"Action_Type\":\"Email\",\"Action\":{}}]","DESCRIPTION":"l","RULE_TYPE":"Calculation Rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":null},{"ID":46,"NAME":"j","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Condition_Type\":\"SQL\",\"Condition\":[{\"Type\":\"table\",\"Operator\":\"=\",\"Value\":\"ENV_RESULTS\"},{\"Type\":\"Column\",\"Operator\":\"=\",\"Value\":\"TMP\"},{\"Type\":\"Column_Filter\",\"Operator\":\">\",\"Value\":\"150\"}]}]","ACTION_LIST":"[{\"Action_Type\":\"Email\",\"Action\":\"\"}]","DESCRIPTION":"l","RULE_TYPE":"Calculation Rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":null},{"ID":47,"NAME":"j","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Condition_Type\":\"SQL\",\"Condition\":[{\"Type\":\"table\",\"Operator\":\"=\",\"Value\":\"ENV_RESULTS\"},{\"Type\":\"Column\",\"Operator\":\"=\",\"Value\":\"TMP\"},{\"Type\":\"Column_Filter\",\"Operator\":\">\",\"Value\":\"150\"}]}]","ACTION_LIST":"[{\"Action_Type\":\"Email\",\"Action\":[{\"0\":{\"To\":\"j\",\"Subject\":\"k\",\"Body\":\"h\"}}]}]","DESCRIPTION":"kl","RULE_TYPE":"Calculation Rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":null},{"ID":48,"NAME":"h","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Condition_Type\":\"SQL\",\"Condition\":[{\"Type\":\"table\",\"Operator\":\"=\",\"Value\":\"ENV_RESULTS\"},{\"Type\":\"Column\",\"Operator\":\"=\",\"Value\":\"TMP\"},{\"Type\":\"Column_Filter\",\"Operator\":\">\",\"Value\":\"150\"}]}]","ACTION_LIST":"[{\"Action_Type\":\"Email\",\"Action\":[{\"0\":{\"To\":\"hh\",\"Subject\":\"i\",\"Body\":\"gu\"}}]}]","DESCRIPTION":"g","RULE_TYPE":"Calculation Rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":null},{"ID":49,"NAME":"h","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Condition_Type\":\"SQL\",\"Condition\":[{\"Type\":\"table\",\"Operator\":\"=\",\"Value\":\"ENV_RESULTS\"},{\"Type\":\"Column\",\"Operator\":\"=\",\"Value\":\"TMP\"},{\"Type\":\"Column_Filter\",\"Operator\":\">\",\"Value\":\"150\"}]}]","ACTION_LIST":"[{\"Action_Type\":\"Email\",\"Action\":[null]}]","DESCRIPTION":"gh","RULE_TYPE":"Calculation Rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":null},{"ID":50,"NAME":"hjk","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Condition_Type\":\"SQL\",\"Condition\":[{\"Type\":\"table\",\"Operator\":\"=\",\"Value\":\"ENV_RESULTS\"},{\"Type\":\"Column\",\"Operator\":\"=\",\"Value\":\"TMP\"},{\"Type\":\"Column_Filter\",\"Operator\":\">\",\"Value\":\"150\"}]}]","ACTION_LIST":"[{\"Action_Type\":\"Email\",\"Action\":[null]}]","DESCRIPTION":"gfhj","RULE_TYPE":"Demo rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":null},{"ID":51,"NAME":"hj","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Condition_Type\":\"SQL\",\"Condition\":[{\"Type\":\"table\",\"Operator\":\"=\",\"Value\":\"ENV_RESULTS\"},{\"Type\":\"Column\",\"Operator\":\"=\",\"Value\":\"TMP\"},{\"Type\":\"Column_Filter\",\"Operator\":\">\",\"Value\":\"150\"}]}]","ACTION_LIST":"[{\"Action_Type\":\"Email\",\"Action\":[{\"0\":{\"To\":\"h\",\"Subject\":\"vh\",\"Body\":\"ghj\"}}]}]","DESCRIPTION":"fgh","RULE_TYPE":"Demo rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":null},{"ID":52,"NAME":"bnm","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Rule_Type\":\"SQL\",\"Execution_Time_Frame\":\"12\",\"Condition\":[{\"Type\":\"Table\",\"Operator\":\"=\",\"Value\":\"GEM_PRECARE_CRUNCH_DS.SENSOR_STATUS_CRUNCH\"},{\"Type\":\"Column\",\"Operator\":\"=\",\"Value\":\"ROW_STATE\"},{\"Type\":\"Column_Filter\",\"Operator\":\"=\",\"Value\":\"'COMPLETE'\"},{\"Type\":\"Time_Column\",\"Operator\":\"=\",\"Value\":\"DTTM_START\"}]},{\"Trigger\":\"Auto\",\"Rule_Type\":\"Schedule\",\"Execution_Time_Frame\":\"8\",\"Condition\":[{\"Type\":\"Time\",\"Operator\":\"=\",\"Value\":\"15:16\"}]}]","ACTION_LIST":"[{\"Type\":\"Update_Analytics\",\"Parameters\":{\"Table\":\"GEM_PRECARE_APPANA_DS_IND|SENSOR_STATUS\"}}]","DESCRIPTION":"hj","RULE_TYPE":"Calculation Rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":"2018-10-05T05:16:00.000Z"},{"ID":53,"NAME":"New to Complete rule","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Rule_Type\":\"SQL\",\"Execution_Time_Frame\":\"2\",\"Condition\":[{\"Type\":\"Table\",\"Operator\":\"=\",\"Value\":\"GEM_PRECARE_CRUNCH_DS.SENSOR_STATUS_CRUNCH\"},{\"Type\":\"Column\",\"Operator\":\"=\",\"Value\":\"STATUS_CODE\"},{\"Type\":\"Column_Filter\",\"Operator\":\"=\",\"Value\":\"'SubLotEnd'\"},{\"Type\":\"Column\",\"Operator\":\"=\",\"Value\":\"HOST_ID\"},{\"Type\":\"Column_Filter\",\"Operator\":\"=\",\"Value\":\"10\"},{\"Type\":\"Time_Column\",\"Operator\":\"=\",\"Value\":\"DTTM_START\"}]},{\"Trigger\":\"Auto\",\"Rule_Type\":\"Schedule\",\"Execution_Time_Frame\":\"8\",\"Condition\":[{\"Type\":\"Time\",\"Operator\":\"=\",\"Value\":\"22:47\"}]}]","ACTION_LIST":"[{\"Type\":\"Update_RowState\",\"Parameters\":{\"Table\":\"GEM_PRECARE_CRUNCH|SENSOR_STATUS_CRUNCH\"}}]","DESCRIPTION":"New to Complete rule","RULE_TYPE":"Calculation Rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":"2018-07-27T12:47:50.000Z"},{"ID":54,"NAME":"test","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Rule_Type\":\"Schedule\",\"Execution_Time_Frame\":\"\",\"Condition\":[{\"Type\":\"Time\",\"Operator\":\"=\",\"Value\":\"11:59\"}]}]","ACTION_LIST":"[{\"Type\":\"Email\",\"Parameters\":{\"To\":\"ankita.vibhandik@gembo.co\",\"Subject\":\"test\",\"Body\":\"test\"}}]","DESCRIPTION":"test","RULE_TYPE":"Calculation Rules","STATE":"Idle","DATE_CREATED":"2018-09-26T18:53:10.000Z","LAST_EXECUTION_TIME":"2018-10-12T01:59:00.000Z"},{"ID":55,"NAME":"Archive_Data","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Rule_Type\":\"Archive\",\"Execution_Time_Frame\":\"2\",\"Condition\":[{\"Type\":\"RawData\",\"Operator\":\"=\",\"Value\":\"Yes\"}]},{\"Trigger\":\"Auto\",\"Rule_Type\":\"Schedule\",\"Execution_Time_Frame\":\"8\",\"Condition\":[{\"Type\":\"Time\",\"Operator\":\"=\",\"Value\":\"17:42\"}]}]\n","ACTION_LIST":"[{\"Type\":\"Archive_Data\",\"Parameters\":{\"PurgeDecision\":\"Yes\",\"Target_folderpath\":\"/mnt\",\"Type\":\"tar.gz\"}},{\"Type\":\"Email\",\"Parameters\":{\"To\":\"ankita.vibhandik@gembo.co\",\"Subject\":\"data archived\",\"Body\":\"Analytics updated successfully\"}}]","DESCRIPTION":"archive","RULE_TYPE":"Calculation Rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":"2018-11-01T07:42:40.000Z"},{"ID":56,"NAME":"execute report","CONDITION_LIST":"[\n  {\n    \"Trigger\": \"Auto\",\n    \"Rule_Type\": \"Schedule\",\n    \"Execution_Time_Frame\": \"8\",\n    \"Condition\": [\n      {\n        \"Type\": \"Time\",\n        \"Operator\": \"=\",\n        \"Value\": \"17:57\"\n      }\n    ]\n  }\n]","ACTION_LIST":"[{\"Type\":\"Execute_MTBF_OEE_Report\",\"Parameters\":{\"Name\":\"Host_VitroxTR1100i\"}},{\"Type\":\"Email\",\"Parameters\":{\"To\":\"ankita.vibhandik@gembo.co;pavan.shekar@gembo.co;dharmesh.bhanushali@gembo.co\",\"Subject\":\"Successfully Executed _MTBF_OEE_Report\",\"Body\":\"Successfully Executed _MTBF_OEE_Report\"}}]","DESCRIPTION":"Execute_MTBF_OEE_Report","RULE_TYPE":"Calculation Rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":"2018-12-04T09:57:50.000Z"},{"ID":57,"NAME":"update performance","CONDITION_LIST":"[{\"Trigger\":\"Auto\",\"Rule_Type\":\"SQL\",\"Execution_Time_Frame\":\"12\",\"Condition\":[{\"Type\":\"Table\",\"Operator\":\"=\",\"Value\":\"GEM_PRECARE_CRUNCH_DS.SENSOR_STATUS_CRUNCH\"},{\"Type\":\"Column\",\"Operator\":\"=\",\"Value\":\"ROW_STATE\"},{\"Type\":\"Column_Filter\",\"Operator\":\"=\",\"Value\":\"'COMPLETE'\"},{\"Type\":\"Time_Column\",\"Operator\":\"=\",\"Value\":\"DTTM_START\"}]},{\"Trigger\":\"Auto\",\"Rule_Type\":\"Schedule\",\"Execution_Time_Frame\":\"8\",\"Condition\":[{\"Type\":\"Time\",\"Operator\":\"=\",\"Value\":\"16:03\"}]}]","ACTION_LIST":"[{\"Type\":\"Update_Performance\",\"Parameters\":{\"Table\":\"GEM_PRECARE_APPANA_DS_IND|SENSOR_STATUS\"}},{\"Type\":\"Email\",\"Parameters\":{\"To\":\"ankita.vibhandik@gembo.co;pavan.shekar@gembo.co;dharmesh.bhanushali@gembo.co\",\"Subject\":\"dATA UPDATED AND INSERTED SUCCESSFULLY\",\"Body\":\"Analytics updated successfully\"}}]","DESCRIPTION":"g","RULE_TYPE":"Calculation Rules","STATE":"Idle","DATE_CREATED":"2017-11-01T23:20:00.000Z","LAST_EXECUTION_TIME":"2019-01-10T08:03:50.000Z"}],"loading":false,"ruleType":[{"ID":1,"NAME":"Calculation Rules","DESCRIPTION":"demo"},{"ID":2,"NAME":"Demo rules","DESCRIPTION":"demo rules"}],"conditionKey":[{"ID":1,"KEY_NAME":"Table","KEY_TYPE":"SQL","KEY_DIRECTION":"Condition","DESCRIPTION":"Select table name"},{"ID":2,"KEY_NAME":"Column","KEY_TYPE":"SQL","KEY_DIRECTION":"Condition","DESCRIPTION":"Select Column name"},{"ID":5,"KEY_NAME":"Operator","KEY_TYPE":"SQL","KEY_DIRECTION":"Condition","DESCRIPTION":"value info"},{"ID":6,"KEY_NAME":"To","KEY_TYPE":"Email","KEY_DIRECTION":"Action","DESCRIPTION":"reciepnt of email"},{"ID":7,"KEY_NAME":"Subject","KEY_TYPE":"Email","KEY_DIRECTION":"Action","DESCRIPTION":"subject of email"},{"ID":8,"KEY_NAME":"Body","KEY_TYPE":"Email","KEY_DIRECTION":"Action","DESCRIPTION":"body of email"},{"ID":12,"KEY_NAME":"Event Type","KEY_TYPE":"Add_Event","KEY_DIRECTION":"Action","DESCRIPTION":"Insert Error Message"},{"ID":13,"KEY_NAME":"Value","KEY_TYPE":"SQL","KEY_DIRECTION":"Condition","DESCRIPTION":"value info"},{"ID":14,"KEY_NAME":"TimeFrame","KEY_TYPE":"SQL","KEY_DIRECTION":"Condition","DESCRIPTION":"value info"},{"ID":25,"KEY_NAME":"Time","KEY_TYPE":"Schedule","KEY_DIRECTION":"Condition","DESCRIPTION":"Schedule time for a rule"},{"ID":27,"KEY_NAME":"Time_Column","KEY_TYPE":"SQL","KEY_DIRECTION":"Condition","DESCRIPTION":"Time Column for time range"},{"ID":29,"KEY_NAME":"Table","KEY_TYPE":"Datastore","KEY_DIRECTION":"Condition","DESCRIPTION":"Select Table"},{"ID":30,"KEY_NAME":"Column","KEY_TYPE":"Datastore","KEY_DIRECTION":"Condition","DESCRIPTION":"Select Column"},{"ID":31,"KEY_NAME":"Value","KEY_TYPE":"Datastore","KEY_DIRECTION":"Condition","DESCRIPTION":"Type input value for column. "},{"ID":32,"KEY_NAME":"Operator","KEY_TYPE":"Datastore","KEY_DIRECTION":"Condition","DESCRIPTION":"Select operation to be performed on value"},{"ID":33,"KEY_NAME":"Aggregation Column","KEY_TYPE":"Datastore","KEY_DIRECTION":"Condition","DESCRIPTION":"Select Column for performing aggregation"},{"ID":34,"KEY_NAME":"Aggregation Funtion","KEY_TYPE":"Datastore","KEY_DIRECTION":"Condition","DESCRIPTION":"Select aggregated function "},{"ID":35,"KEY_NAME":"Aggregation Value","KEY_TYPE":"Datastore","KEY_DIRECTION":"Condition","DESCRIPTION":"Type value for aggregate column."},{"ID":36,"KEY_NAME":"Aggregation Operator","KEY_TYPE":"Datastore","KEY_DIRECTION":"Condition","DESCRIPTION":"Select operator"},{"ID":37,"KEY_NAME":"Time Column","KEY_TYPE":"Datastore","KEY_DIRECTION":"Condition","DESCRIPTION":"Select time column "},{"ID":38,"KEY_NAME":"Time Frame","KEY_TYPE":"Datastore","KEY_DIRECTION":"Condition","DESCRIPTION":"Select time frame (DURATION IN HOURS)"},{"ID":39,"KEY_NAME":"Session","KEY_TYPE":"Activate_Session","KEY_DIRECTION":"Action","DESCRIPTION":"New session id to be assigned"},{"ID":40,"KEY_NAME":"Event Details","KEY_TYPE":"Add_Event","KEY_DIRECTION":"Action","DESCRIPTION":"Insert Error Message"},{"ID":47,"KEY_NAME":"RawData","KEY_TYPE":"Archive","KEY_DIRECTION":"Condition","DESCRIPTION":"Select operator"},{"ID":48,"KEY_NAME":"FormattedData","KEY_TYPE":"Archive","KEY_DIRECTION":"Condition","DESCRIPTION":"Select operator"},{"ID":49,"KEY_NAME":"AnalyticsData","KEY_TYPE":"Archive","KEY_DIRECTION":"Condition","DESCRIPTION":"Select operator"},{"ID":50,"KEY_NAME":"PurgeDecision","KEY_TYPE":"Archive_Data","KEY_DIRECTION":"Action","DESCRIPTION":"New session id to be assigned"},{"ID":51,"KEY_NAME":"Target_folderpath","KEY_TYPE":"Archive_Data","KEY_DIRECTION":"Action","DESCRIPTION":"New session id to be assigned"},{"ID":52,"KEY_NAME":"Type","KEY_TYPE":"Archive_Data","KEY_DIRECTION":"Action","DESCRIPTION":"New session id to be assigned"},{"ID":53,"KEY_NAME":"RawData","KEY_TYPE":"Archive_Data","KEY_DIRECTION":"Action","DESCRIPTION":"New session id to be assigned"}],"conditionType":[{"ID":1,"NAME":"Datastore","DESCRIPTION":"SQL condition with aggregated functions","TYPE":"CONDITION","UI_NAME":"Datastore"},{"ID":2,"NAME":"Email","DESCRIPTION":"email","TYPE":"ACTION","UI_NAME":"Email"},{"ID":3,"NAME":"Maintanence","DESCRIPTION":"Demo","TYPE":"CONDITION","UI_NAME":"Maintanence"},{"ID":4,"NAME":"Add_Event","DESCRIPTION":"Add Event","TYPE":"ACTION","UI_NAME":"Add Event"},{"ID":5,"NAME":"SQL","DESCRIPTION":"SQL condition with aggregated functions","TYPE":"CONDITION","UI_NAME":"SQL"},{"ID":7,"NAME":"Schedule","DESCRIPTION":"Schedule for the rule","TYPE":"CONDITION","UI_NAME":"Schedule"},{"ID":8,"NAME":"TEXT","DESCRIPTION":"Schedule for the rule","TYPE":"ACTION","UI_NAME":"Text Msg"},{"ID":9,"NAME":"Activate_Session","DESCRIPTION":"Schedule for the rule","TYPE":"ACTION","UI_NAME":"Activate Session"},{"ID":10,"NAME":"Indicate_Event","DESCRIPTION":"Schedule for the rule","TYPE":"ACTION","UI_NAME":"Indicate Event"},{"ID":11,"NAME":"Archive_Data","DESCRIPTION":"Schedule for the rule","TYPE":"ACTION","UI_NAME":"Archive_Data"},{"ID":12,"NAME":"Archive","DESCRIPTION":"Archive","TYPE":"CONDITION","UI_NAME":"Archive"}]}
		}
	}
	//   New Host Form
	showModalCreate = () => {
		this.setState({ visible: true, edit: false });
	  }
  
	  // Handle Cancel
	  handleCancel = () => {
		this.setState({ visible: false, edit: false, currentEditingSensor: {}, sensorKey: [] });
	  }
  
	render() {
		return(
		<div>
		<Button type="primary" onClick={this.showModalCreate}>New Rule</Button>
		<CreateModal
		visible = {this.state.visible}
		rules = {this.state.rules}
		/>
	  </div>
		)





		// return (
		// 	<Layout>
		// 		<CustomHeader/>
		// 	<Layout>
		// 	  <Content style={{ margin: '10px 0' }}>
		// 	  	<div style={{textAlign:'center', padding:'10'}}>
		// 		   <Avatar 
		// 		 	  size={200} 
		// 		 	  src='https://lh3.googleusercontent.com/k_JL0eyN9tYkonu44_XqFQBWQlWnIEEurp-qpT8rumyK462GizIWFc6VoWlzYOt1Le7rTTQdMwtD5p7m08J_K90A9cplubfuh_imly_dfJJFlqaWzzy74Z9OkU8QIBctp6fZ6v9sd0NUDfJT27q-YD3f-lZP9ika4glWGMoCCnxicau4lPkZPraF5Q0Mjtrn2Cc8Xul3KZV1TqeaK4DY43x9Xoc_tRS7N7LkyC2CbOEU2CXdyjGhSJl5d9TCEYymVvPJ7z7QDRp3F1E5I5khIKty6roqz66xFUadRJjH928PRFJ4Tx-CXO6Gm_Fe_cPHBlzZQo46w3CesbZvWfsDGVwSBsI1vRnMG-DJ2EwlfxGwKgVv6cadwYows0w3ItgBM-HWyKx27qu70KjXefQlnsWMznv1CQP-rQZAxOCQPwQd4M6FAGNrqJJtFqJcPgBpPJuwMrxGKJQ5l7bCpQZoOzdNpGvC3xIN_Sbusx7RQSTWk5TVevr3v6S8F1lMSeo3hfMSqk0Z39BN7hUjUkOo0rwte7UwE6QHaHTKxLZk4cGtH8XBT3XUDNaN64HrBoZF6KA9XARAcXEz8TTRVwETMhIY33t7f2BdTzyMGDAuSgocv_AQV02nUlHikcjtyGAvln2t7sqrUwU3pGAsjWHZy7qeyZLc0Haw=w1714-h1800-no' 
		// 		   />
		// 		   <p>Phuc Le</p>
		// 		   <p>Full-stack Developer</p>
		// 		</div>
		// 		<div style={{ padding: 24, minHeight: 360}}>
		// 		  {this.props.content || 'Hello'}
		// 		</div>
		// 	  </Content>
		// 	  <Footer style={{ textAlign: 'center' }}>
		// 		My Story ©2018 Created by Phuc Le
		// 	  </Footer>
		// 	</Layout>
		//   </Layout>
		// );
	}
  }
  
  export default CustomLayout