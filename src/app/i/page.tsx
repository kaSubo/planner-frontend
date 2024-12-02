import { Heading } from '@/components/ui';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { Metadata } from 'next';
import React from 'react';
import { Statistics } from './Statistics';

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE,
};

export default function DashboardPage() {
	return <div>
    <Heading title='Statistics' />
    <Statistics />
  </div>;
}
