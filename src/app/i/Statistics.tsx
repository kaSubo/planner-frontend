'use client';

import Loader from '@/components/ui/Loader';
import { useProfile } from '@/hooks/useProfile';
import React from 'react';

interface Props {
	className?: string;
}

export const Statistics: React.FC<Props> = ({ className }) => {
	const { data, isLoading } = useProfile();
	return isLoading ? (
		<Loader />
	) : (
		<div className='grid grid-cols-4 gap-12 mt-7'>
			{data?.statistics.length ? (
				data.statistics.map((statistic) => (
					<div
						key={statistic.label}
						className='bg-border/5 rounded-xl p-layout text-center hover:-translate-y-3 transition-transform duration-500'>
						<div className='text-xl'>{statistic.label}</div>
						<div className='text-3xl font-semibold'>{statistic.value}</div>
					</div>
				))
			) : (
				<div>No statistics</div>
			)}
		</div>
	);
};
