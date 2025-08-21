import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Charging Station SaaS',
  description: 'Multi-tenant SaaS platform for electric vehicle charging network operators',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}