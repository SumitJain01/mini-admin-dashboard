'use client';

import Head from 'next/head';

interface CustomHeadProps {
  title: string;
  description: string;
}

export function CustomHead({ title, description }: CustomHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
}
