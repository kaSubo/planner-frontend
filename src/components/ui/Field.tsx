import React from 'react';
import cn from 'clsx';

interface InputFieldProps {
	id: string;
	label: string;
	extra?: string;
	placeholder: string;
	variant?: string;
	state?: 'error' | 'success';
	disabled?: boolean;
	type?: string;
	isNumber?: boolean;
}
type TTransparentField = React.InputHTMLAttributes<HTMLInputElement>;

export const Field = React.forwardRef<HTMLInputElement, InputFieldProps>(
	({ label, id, extra, type, placeholder, state, disabled, isNumber, ...rest }, ref) => {
		return (
			<div className={`${extra}`}>
				<label
					htmlFor={id}
					className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}>
					{label}
				</label>
				<input
					ref={ref}
					disabled={disabled}
					type={type}
					id={id}
					placeholder={placeholder}
					className={`mt-2 flex w-full items-center justify-center rounded-xl border border-border bg-white/0 p-3 text-base outline-none placeholder:text-white/30 placeholder:font-normal duration-500 transition-colors focus:border-primary ${
						disabled === true
							? '!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]'
							: state === 'error'
								? 'border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400'
								: state === 'success'
									? 'border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400'
									: ''
					}`}
					onKeyDown={(event) => {
						if (
							isNumber &&
							!/[0-9]/.test(event.key) &&
							event.key !== 'Backspace' &&
							event.key !== 'Tab' &&
							event.key !== 'Enter' &&
							event.key !== 'ArrowLeft' &&
							event.key !== 'ArrowRight'
						) {
							event.preventDefault();
						}
					}}
					{...rest}
				/>
			</div>
		);
	}
);

Field.displayName = 'field';

export const TransparentField = React.forwardRef<HTMLInputElement, TTransparentField>(
	({ className, ...rest }, ref) => {
		return (
			<input
				className={cn(
					'bg-transparent border-none focus:outline-0 focus:shadow-transparent w-full text-nowrap text-ellipsis',
					className
				)}
				ref={ref}
				{...rest}
			/>
		);
	}
);

TransparentField.displayName = 'TransparentField';
