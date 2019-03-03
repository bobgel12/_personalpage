	import {
	Layout, Menu, Breadcrumb, Icon, Avatar, Button, Drawer
  } from 'antd';

  import CustomHeader from './CustomHeader'

  const {
	Header, Content, Footer, Sider,
  } = Layout;
  class CustomLayout extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			content: ''
		}
	}
	render() {
		return (
			<Layout>
				<CustomHeader/>
			<Layout>
			  <Content style={{ margin: '10px 0' }}>
			  	<div style={{textAlign:'center', padding:'10'}}>
				   <Avatar 
				 	  size={200} 
				 	  src='https://lh3.googleusercontent.com/k_JL0eyN9tYkonu44_XqFQBWQlWnIEEurp-qpT8rumyK462GizIWFc6VoWlzYOt1Le7rTTQdMwtD5p7m08J_K90A9cplubfuh_imly_dfJJFlqaWzzy74Z9OkU8QIBctp6fZ6v9sd0NUDfJT27q-YD3f-lZP9ika4glWGMoCCnxicau4lPkZPraF5Q0Mjtrn2Cc8Xul3KZV1TqeaK4DY43x9Xoc_tRS7N7LkyC2CbOEU2CXdyjGhSJl5d9TCEYymVvPJ7z7QDRp3F1E5I5khIKty6roqz66xFUadRJjH928PRFJ4Tx-CXO6Gm_Fe_cPHBlzZQo46w3CesbZvWfsDGVwSBsI1vRnMG-DJ2EwlfxGwKgVv6cadwYows0w3ItgBM-HWyKx27qu70KjXefQlnsWMznv1CQP-rQZAxOCQPwQd4M6FAGNrqJJtFqJcPgBpPJuwMrxGKJQ5l7bCpQZoOzdNpGvC3xIN_Sbusx7RQSTWk5TVevr3v6S8F1lMSeo3hfMSqk0Z39BN7hUjUkOo0rwte7UwE6QHaHTKxLZk4cGtH8XBT3XUDNaN64HrBoZF6KA9XARAcXEz8TTRVwETMhIY33t7f2BdTzyMGDAuSgocv_AQV02nUlHikcjtyGAvln2t7sqrUwU3pGAsjWHZy7qeyZLc0Haw=w1714-h1800-no' 
				   />
				   <p>Phuc Le</p>
				   <p>Full-stack Developer</p>
				</div>
				<div style={{ padding: 24, minHeight: 360}}>
				  {this.props.content || 'Hello'}
				</div>
			  </Content>
			  <Footer style={{ textAlign: 'center' }}>
				My Story ©2018 Created by Phuc Le
			  </Footer>
			</Layout>
		  </Layout>
		);
	}
  }
  
  export default CustomLayout