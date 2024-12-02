import React from 'react';

type TypeOut = {
	ref: any;
	isOpened: boolean;
	setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useOutside = (initialIsVisible: boolean): TypeOut => {
	const [isOpened, setIsOpened] = React.useState(initialIsVisible);
	const ref = React.useRef<HTMLElement>(null);

	const handleClickOutside = (event: any) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsOpened(false);
		}
	};

	React.useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	});
	return { ref, isOpened, setIsOpened };
};
