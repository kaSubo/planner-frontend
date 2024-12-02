import { useOutside } from '@/hooks/useOutside';
import cn from 'clsx';
import React from 'react';
import { Badge } from '../Badge';
import { X } from 'lucide-react';

interface IOption {
	label: string;
	value: string;
}

interface Props {
	data: IOption[];
	onChange: (value: string) => void;
	value: string;
	isColorSelect?: boolean;
	className?: string;
}

export const SingleSelect: React.FC<Props> = ({
	data,
	onChange,
	value,
	isColorSelect,
	className,
}) => {
	const { isOpened, setIsOpened, ref } = useOutside(false);
	const getValue = () => data.find((item) => item.value == value)?.value;

	return (
		<div
			className={cn('relative min-w-36 flex items-center gap-5 order-1', {
				className,
				'w-max': isColorSelect,
			})}
			ref={ref}>
			<button
				onClick={(e) => {
					e.preventDefault();
					setIsOpened(!isOpened);
				}}>
				{getValue() ? (
					<Badge
						variant={value}
						style={isColorSelect ? { backgroundColor: value } : {}}
						className='capitalize'>
						{getValue()}
					</Badge>
				) : (
					<Badge>Click to select</Badge>
				)}
			</button>
			{value && !isColorSelect && (
				<button
					onClick={(e) => {
						e.preventDefault();
						onChange('');
					}}
					className='opacity-30 hover:opacity-100 transition-opacity -order-1'>
					<X size={20} />
				</button>
			)}
			{isOpened && (
				<div
					style={{
						top: 'calc(100% + .5rem)',
					}}
					className={cn(
						'absolute w-full p-2.5 left-0 slide bg-sidebar z-10 shadow rounded-lg'
					)}>
					{data.map((item) => (
						<button
							key={item.value}
							onClick={(e) => {
								e.preventDefault();
								onChange(item.value);
								setIsOpened(false);
							}}
							style={
								isColorSelect
									? {
											backgroundColor: item.value,
										}
									: {}
							}
							className='block mb-4 last:mb-0 capitalize rounded-lg'>
							<Badge variant={item.value}>{item.label}</Badge>
						</button>
					))}
				</div>
			)}
		</div>
	);
};
