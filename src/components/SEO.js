import React from 'react';
import Helmet from 'react-helmet';

export const SEO = ({ description, title }) => {
	return (
		<Helmet>
			<meta name="description" content={description} />
			{/* The title of your current page */}
			<title>{title}</title>

			{/* Default language and direction */}
			<html lang="en" dir="ltr" />
		</Helmet>
	);
};
