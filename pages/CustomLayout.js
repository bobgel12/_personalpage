	import {
	Layout, Menu, Breadcrumb, Icon, Avatar, Button, Drawer
  } from 'antd';
  const {
	Header, Content, Footer, Sider,
  } = Layout;
  class SiderDemo extends React.Component {
	state = {
		current: 'mail',
		visible: false
	  }
	  showDrawer = () => {
		this.setState({
		  visible: true,
		});
	  };
	onClose = () => {
		this.setState({
		  visible: false,
		});
	  };

	render() {
		return (
			<Layout>
			<Sider
			  breakpoint="lg"
			  collapsedWidth="0"
			  onBreakpoint={(broken) => { console.log(broken); }}
			  onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
			>
			  <div className="logo" />
			  <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
				<Menu.Item key="1">
				  <Icon type="user" />
				  <span className="nav-text">Profile</span>
				</Menu.Item>
				<Menu.Item key="2">
				  <Icon type="video-camera" />
				  <span className="nav-text">Experience</span>
				</Menu.Item>
				<Menu.Item key="3">
				  <Icon type="upload" />
				  <span className="nav-text">Education</span>
				</Menu.Item>
				<Menu.Item key="4">
				  <Icon type="user" />
				  <span className="nav-text">Projects</span>
				</Menu.Item>
			  </Menu>
			</Sider>
			<Layout>
			  	<div style={{textAlign:'center', padding:'10'}}>
				   <Avatar 
				 	  size={200} 
				 	  src='https://lh3.googleusercontent.com/k_JL0eyN9tYkonu44_XqFQBWQlWnIEEurp-qpT8rumyK462GizIWFc6VoWlzYOt1Le7rTTQdMwtD5p7m08J_K90A9cplubfuh_imly_dfJJFlqaWzzy74Z9OkU8QIBctp6fZ6v9sd0NUDfJT27q-YD3f-lZP9ika4glWGMoCCnxicau4lPkZPraF5Q0Mjtrn2Cc8Xul3KZV1TqeaK4DY43x9Xoc_tRS7N7LkyC2CbOEU2CXdyjGhSJl5d9TCEYymVvPJ7z7QDRp3F1E5I5khIKty6roqz66xFUadRJjH928PRFJ4Tx-CXO6Gm_Fe_cPHBlzZQo46w3CesbZvWfsDGVwSBsI1vRnMG-DJ2EwlfxGwKgVv6cadwYows0w3ItgBM-HWyKx27qu70KjXefQlnsWMznv1CQP-rQZAxOCQPwQd4M6FAGNrqJJtFqJcPgBpPJuwMrxGKJQ5l7bCpQZoOzdNpGvC3xIN_Sbusx7RQSTWk5TVevr3v6S8F1lMSeo3hfMSqk0Z39BN7hUjUkOo0rwte7UwE6QHaHTKxLZk4cGtH8XBT3XUDNaN64HrBoZF6KA9XARAcXEz8TTRVwETMhIY33t7f2BdTzyMGDAuSgocv_AQV02nUlHikcjtyGAvln2t7sqrUwU3pGAsjWHZy7qeyZLc0Haw=w1714-h1800-no' 
				   />
				   <h2>Phuc Le - Full-stack Developer</h2>
				  </div>
			  <Content style={{ margin: '10px 0' }}>
				<div style={{ padding: 24, minHeight: 360 , border: 'solid'}}>
				  content
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
  
  export default SiderDemo