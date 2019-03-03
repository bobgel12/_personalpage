import {
	Layout, Menu, Breadcrumb, Icon, Avatar, Button, Drawer
  } from 'antd';
import Link from 'next/link'
import { Jumbotron } from 'reactstrap';
const {
	Header, Content, Footer, Sider,
  } = Layout;

export default () => (
		<Sider
		breakpoint="lg"
		collapsedWidth="0"
		onBreakpoint={(broken) => { console.log(broken); }}
		onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
		>
		<div className="logo" />
		<Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
		  <Menu.Item key="1">
			<Link href="/profile">
				<div>
					<Icon type="user" />
					<span className="nav-text">Profile</span>
				</div>
		    </Link>
		  </Menu.Item>
		  <Menu.Item key="2">
			<Link href="/experience">
				<div>
					<Icon type="code-o" />
					<span className="nav-text">Experience</span>
				</div>
		    </Link>
		  </Menu.Item>
		  <Menu.Item key="3">
			<Link href="/education">
				<div>
					<Icon type="book" />
					<span className="nav-text">Education</span>
				</div>
		    </Link>
		  </Menu.Item>
		  <Menu.Item key="4">
			<Link href="/projects">
				<div>
					<Icon type="rocket" />
					<span className="nav-text">Projects</span>
				</div>
		    </Link>
		  </Menu.Item>
		</Menu>
		</Sider>
)