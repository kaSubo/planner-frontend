import React from 'react';

interface IUseLocalStorage<T> {
	key: string;
	defaultValue: T;
}

export function useLocalStorage<T>({
	key,
	defaultValue,
}: IUseLocalStorage<T>): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
	const [isLoading, setIsLoading] = React.useState(true);
	const [type, setType] = React.useState<T>(defaultValue);

	const isMounted = React.useRef(false);

	React.useEffect(() => {
		try {
			const item = window.localStorage.getItem(key);
			if (item) {
				setType(JSON.parse(item));
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
		return () => {
			isMounted.current = false;
		};
	}, [key]);

	React.useEffect(() => {
		if (isMounted.current) {
			window.localStorage.setItem(key, JSON.stringify(type));
		} else {
			isMounted.current = true;
		}
	}, [key, type]);

	return [type, setType, isLoading];
}
