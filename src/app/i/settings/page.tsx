import { Heading } from '@/components/ui';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { Settings } from './Settings';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE,
};

export default function SettingsPage() {
	return (
		<div>
			<Heading title='Settings' />
			<Settings />
		</div>
	);
}
