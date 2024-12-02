import cn from 'clsx';

interface IHeading {
	title: string;
	className?: string;
}

export function Heading({ title, className }: IHeading) {
	return (
		<div>
			<h1 className={cn('text-3xl font-medium', className)}>{title}</h1>
			<div className='my-3 h-0.5 bg-border w-full' />
		</div>
	);
}
