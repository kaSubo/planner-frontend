import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

export function useTimeBlockSortable(id: UniqueIdentifier) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id,
	});

	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
	};
	return { attributes, listeners, setNodeRef, style };
}
