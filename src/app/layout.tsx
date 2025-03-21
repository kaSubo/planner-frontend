import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';
import { SITE_NAME } from '@/constants/seo.constants';
import { Providers } from './providers';
import { Toaster } from 'sonner';

const zen = Noto_Sans({
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	style: 'normal',
	variable: '--font-zen',
});

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
	description: 'The best app for planning & time management',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${zen.variable} antialiased`}>
				<Providers>
					{children}
					<Toaster
						theme='dark'
						position='bottom-right'
						duration={2500}
					/>
				</Providers>
			</body>
		</html>
	);
}
