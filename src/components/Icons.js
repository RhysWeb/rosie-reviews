import logo1 from '../images/logo1.jpg';
import logo2 from '../images/logo2.png';
import logo3 from '../images/logo3.png';

export const Icons = (props) => {
	return (
		<div className={props.className}>
			<img src={logo1} id="logo1" alt="Radipole Park and Gardens Logo" />
			<img src={logo2} id="logo2" alt="Lottery Funding Logo" />
			<img src={logo3} id="logo3" alt="Weymouth Town Council Logo" />
		</div>
	);
};
