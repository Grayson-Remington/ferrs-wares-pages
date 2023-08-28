import Image from 'next/image';
import { Inter } from 'next/font/google';
import { storefront } from '../utils';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Carousel } from '@material-tailwind/react';
import ContactForm from '@/components/contactForm';
export default function Home({ products }) {
	const [images, setImages] = useState([]);

	useEffect(() => {
		setImages(
			products.edges.map((item) => {
				const product = item.node;
				const image = product.images.edges[0].node;
				return image.url;
			})
		);
	}, []);

	return (
		<div className='relative isolate'>
			<h1 className='font-cursive text-5xl text-center p-4'>
				Ferr&apos;s Wares
			</h1>
			<img
				src='/background-image.jpg'
				alt=''
				className='absolute h-full w-full opacity-50 brightness-[.3] object-cover'
			/>
			<div
				className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
				aria-hidden='true'
			>
				<div
					className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
				/>
			</div>
			{/* Comment to update the commit*/}
			<div className='mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8 brightness-100 bg-gray-200 bg-opacity-50  flex flex-col py-4 rounded-b-lg'>
				<div className='h-full w-full self-center  brightness-100 bg-gray-200 bg-opacity-50 flex flex-col mt-8  rounded-t-lg p-4'>
					<Carousel
						transition={{ duration: 1 }}
						autoplay={true}
						autoplayDelay={4000}
						loop={true}
						className='h-96 max-w-2xl self-center '
					>
						{products.edges.map((item, index) => {
							const product = item.node;
							const image = product.images.edges[0].node;

							return (
								<Link
									key={product.handle}
									href={`/products/${product.handle}`}
									className='relative'
								>
									<img
										src={image.url}
										alt={'image' + (index + 1)}
										className='h-full w-full object-cover'
									/>
								</Link>
							);
						})}
					</Carousel>
				</div>

				<h2 className='sr-only'>Products</h2>

				<div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 brightness-100 bg-gray-200 bg-opacity-50 p-6 '>
					{products.edges.map((item) => {
						const product = item.node;
						const image = product.images.edges[0].node;

						return (
							<Link
								key={product.handle}
								href={`/products/${product.handle}`}
								className='relative'
							>
								{product.totalInventory == 0 && (
									<div className='absolute z-50 flex place-content-center place-items-center h-12 w-12 -left-4 -top-4'>
										<div
											id='burst-12'
											className='absolute'
										></div>
										<div className='absolute text-sm text-center font-serif text-white drop-shadow-[0_2.2px_2.2px_rgba(0,0,0,0.8)]'>
											Sold Out!
										</div>
									</div>
								)}

								<div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
									<img
										src={image.url}
										alt={image.altText}
										className='h-full w-full object-cover object-center group-hover:opacity-75'
									/>
								</div>

								<h3 className='mt-4 text-sm text-gray-700'>
									{product.title}
								</h3>
								<p className='mt-1 text-lg font-medium text-gray-900'>
									{product.priceRange.minVariantPrice.amount}
								</p>
							</Link>
						);
					})}
				</div>
				<ContactForm />
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const { data } = await storefront(productsQuery);
	return {
		props: {
			products: data.products,
		},
	};
}

const gql = String.raw;

const productsQuery = gql`
	query Products {
		products(first: 6) {
			edges {
				node {
					title
					totalInventory
					handle
					id
					tags
					priceRange {
						minVariantPrice {
							amount
						}
					}
					images(first: 1) {
						edges {
							node {
								url
								altText
							}
						}
					}
				}
			}
		}
	}
`;
