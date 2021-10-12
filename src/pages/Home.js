import React from 'react';

import { Link } from 'react-router-dom';

export const Home = () => {
	return (
		<>
			<hr />
			<Link to="/page_one">Page 1</Link>
			<hr />
			<Link to="/check_all_tests">Page 2</Link>
			<hr />
			<Link to="/addAuthor">Page 3</Link>
			<hr />
		</>
	);
};

/*<FileInput name="files" control={control} />*/ //after typogrphy
/**/
