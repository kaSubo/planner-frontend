import { useOutside } from '@/hooks/useOutside';
import cn from 'clsx';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { X } from 'lucide-react';
import React from 'react';
import { DayPicker, type SelectSingleEventHandler } from 'react-day-picker';
import { formatCaption } from './DayPickerCaption';

interface Props {
	onChange: (value: string) => void;
	value: string;
	position?: 'left' | 'right';
	className?: string;
}

dayjs.extend(LocalizedFormat);

export const DatePicker: React.FC<Props> = ({
	onChange,
	value,
	position = 'right',
	className,
}) => {
	const [selected, setSelected] = React.useState<Date>();
	const { isOpened, setIsOpened, ref } = useOutside(false);

	const handleDaySelect: SelectSingleEventHandler = (date) => {
		const ISODate = date?.toISOString();

		setSelected(date);
		if (ISODate) {
			onChange(ISODate);
			setIsOpened(false);
		} else {
			onChange('');
		}
	};

	return (
		<div
			className={cn('relative flex items-center justify-between gap-5', className)}
			ref={ref}>
			<button onClick={() => setIsOpened(!isOpened)}>
				{value ? dayjs(value).format('LL') : 'Click to select'}
			</button>
			{value && (
				<button
					className='opacity-30 hover:opacity-100 transition-opacity -order-1'
					onClick={() => onChange('')}>
					<X size={20} />
				</button>
			)}
			{isOpened && (
				<div
					className={cn(
						'absolute p-2.5 slide bg-sidebar z-10 shadow rounded-lg',
						position === 'left' ? '-left-4' : '-right-4'
					)}>
					<DayPicker
						autoFocus={isOpened}
						mode='single'
						defaultMonth={selected}
						selected={selected}
						onSelect={handleDaySelect}
						weekStartsOn={1}
						formatters={{ formatCaption }}
					/>
				</div>
			)}
		</div>
	);
};
