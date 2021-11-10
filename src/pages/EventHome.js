import { Link } from 'react-router-dom';
import { EventCard } from '../components/EventCard';
import { Header } from '../components/Header';
import { MainContainerLarger } from '../components/MainContainerLarger';
import { useData } from '../utils/DataContext';

export const EventHome = () => {
	const { currentEvent } = useData();
	return (
		<MainContainerLarger>
			<Header />

			<EventCard
				eventCode={currentEvent.eventCode}
				eventName={currentEvent.eventName}
				eventDate={currentEvent.eventDate}
				buttonName="Review"
			/>
			<hr />
			<Link to="/reviewPage">go to event review page</Link>
			<hr />
			<Link to="/resultsPage">view results</Link>
			<hr />
			<Link to="/localStoragePage">view local storage</Link>
			<hr />
			<Link to="/viewEvents">back to existing events</Link>
			<hr />
		</MainContainerLarger>
	);
};

/*<FileInput name="files" control={control} />*/ //after typogrphy
/**/
