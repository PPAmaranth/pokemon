import listLess from '@/style/list.less';

export class List extends React.Component{
	constructor() {
	    super();
	}
    renderListItem(item){
		return (
			<tr key={item.key} className={listLess.listItem}>
				<td className={listLess.label}>{item.label}</td>
				<td className={listLess.colon}>：</td>
				<td className={listLess.text}>{item.text}</td>
			</tr>
		);
	}
    render(){
    	return (
    		<table className={listLess.list}>
    			<tbody>
					{this.props.list.map((item)=>this.renderListItem(item))}
				</tbody>
			</table>
		)
    }
}