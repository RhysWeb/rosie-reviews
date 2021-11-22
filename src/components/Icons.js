import logo1 from '../images/logo1.jpg';
import logo2 from '../images/logo2.png';
import logo3 from '../images/logo3.png';

export const Icons = () => {
	return (
		<div className="logos2">
			<img
				src={logo1}
				id="logo1"
				alt="Icon Component - Radipole Park and Gardens Logo"
			/>
			<img src={logo2} id="logo2" alt="Icon Component - Lottery Funding Logo" />
			<img
				src={logo3}
				id="logo3"
				alt="Icon Component - Weymouth Town Council Logo"
			/>
		</div>
	);
};
