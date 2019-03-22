import { Icon } from 'antd';
import pageLess from './index.less'
import Link from 'umi/link';

export class TopTab extends React.Component {
	render(){
		console.log(this.props)
		let top;
		if(this.props.state.activePage == 'list'){
			top = (
				<div className={pageLess.topTab}>
					<div>宝可梦图鉴LGPE</div>
				</div>
			)
		}
		if(this.props.state.activePage == 'detail'){
			top = (
				<div className={pageLess.topTab}>
					<div className={pageLess.returnBtn}>
						<Icon type="left" theme="twoTone" twoToneColor="#fff"/>
					</div>
					<div>{this.props.state.currentItem.CNname}</div>
				</div>
			)
		}
		return (
			<div>
				{top}
			</div>
		)
	}
}