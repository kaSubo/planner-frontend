import React from 'react';
import type { IMenuItem } from './menu.interface';
import Link from 'next/link';

interface Props {
	item: IMenuItem;
}

export function MenuItem({ item }: Props) {
	return (
		<div>
			<Link
				href={item.link}
				className='flex gap-2.5 items-center py-1.5 mt-2 px-layout transition-colors hover:bg-border rounded-lg'>
				<item.icon />
				<span>{item.name}</span>
			</Link>
		</div>
	);
}
