import { Icon } from 'antd';
import pageLess from './index.less'
import Link from 'umi/link';

export class TopTab extends React.Component {
	render(){
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
					<div className={pageLess.returnBtn} onClick={()=>this.props.DetailClick()}>
						<Icon type="left"/>
					</div>
					<div>{this.props.state.currentItem.name}</div>
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