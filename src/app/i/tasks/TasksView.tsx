'use client';

import React from 'react';
import { ListView } from './list-view/ListView';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Loader from '@/components/ui/Loader';
import { ViewSwitch } from './ViewSwitch';
import { KanbanView } from './kanban-view/KanbanView';

export type TView = 'list' | 'kanban';

export function TasksView() {
	const [type, setType, isLoading] = useLocalStorage<TView>({
		key: 'view-type',
		defaultValue: 'list',
	});

	if (isLoading) return <Loader />;

	return (
		<div>
			<ViewSwitch
				setType={setType}
				type={type}
			/>
			{type === 'list' ? <ListView /> : <KanbanView />}
		</div>
	);
}
