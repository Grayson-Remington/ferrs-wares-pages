import { storefront } from '../../utils';
import { useState } from 'react';
import Link from 'next/link';

export default function Example({ product, products }) {
	const [show, setShow] = useState(false);
	const [show2, setShow2] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const image = product.images.edges[0].node;
	const variantId = product.variants.edges[0].node.id;
	const relatedProducts = products.edges
		.filter((item) => item.node.handle !== product.handle)
		.slice(0, 4);
	async function checkout() {
		setIsLoading(true);
		const { data } = await storefront(checkoutMutation, { variantId });
		const { webUrl } = data.checkoutCreate.checkout;
		window.location.href = webUrl;
	}
	return (
		<div className='md:flex items-center justify-center py-12 2xl:px-20 md:px-8 px-8'>
			<div className='xl:w-2/6 lg:w-2/5 md:w-80 p-4'>
				<img
					className='w-full rounded-xl'
					alt='img of a girl posing'
					src={image.url}
				/>
			</div>

			<div className='xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6'>
				<div className='border-b border-gray-200 pb-6'>
					<p className='text-sm leading-none text-gray-600'>
						Ferr&apos;s Wares Collection
					</p>
					<h1
						className='
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						'
					>
						{product.title}
					</h1>
				</div>
				<div className='relative'>
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
					<button
						onClick={checkout}
						className='
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-gray-800
						w-full
						py-4
						hover:bg-gray-700
					'
					>
						{product.priceRange.minVariantPrice.amount}
					</button>
				</div>

				<div>
					<p className='xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7'>
						{product.description}
					</p>
				</div>
				<div>
					<div className='border-t border-b py-4 mt-7 border-gray-200'>
						<div
							onClick={() => setShow(!show)}
							className='flex justify-between items-center cursor-pointer'
						>
							<p className='text-base leading-4 text-gray-800'>
								Shipping and returns
							</p>
							<button
								className='
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								'
								aria-label='show or hide'
							>
								<svg
									className={
										'transform ' +
										(show ? 'rotate-180' : 'rotate-0')
									}
									width='10'
									height='6'
									viewBox='0 0 10 6'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M9 1L5 5L1 1'
										stroke='#4B5563'
										strokeWidth='1.25'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>
						</div>
						<div
							className={
								'pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 ' +
								(show ? 'block' : 'hidden')
							}
							id='sect'
						>
							You will be responsible for paying for your own
							shipping costs for returning your item. Shipping
							costs are nonrefundable
						</div>
					</div>
				</div>
				<div>
					<div className='border-b py-4 border-gray-200'>
						<div
							onClick={() => setShow2(!show2)}
							className='flex justify-between items-center cursor-pointer'
						>
							<p className='text-base leading-4 text-gray-800'>
								Contact us
							</p>
							<button
								className='
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								'
								aria-label='show or hide'
							>
								<svg
									className={
										'transform ' +
										(show2 ? 'rotate-180' : 'rotate-0')
									}
									width='10'
									height='6'
									viewBox='0 0 10 6'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M9 1L5 5L1 1'
										stroke='#4B5563'
										strokeWidth='1.25'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>
						</div>
						<div
							className={
								'pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 ' +
								(show2 ? 'block' : 'hidden')
							}
							id='sect'
						>
							If you have any questions on how to return your item
							to us, contact us.
						</div>
					</div>
				</div>

				<div className='grid grid-cols-2 grid-rows-2 gap-4'>
					{relatedProducts.map((item) => {
						const product = item.node;
						const image = product.images.edges[0].node;
						return (
							<div
								key={product.handle}
								className='relative group'
							>
								<Link
									key={product.handle}
									href={`/products/${product.handle}`}
									className=''
								>
									<div className='aspect-w-4 aspect-h-3 overflow-hidden rounded-lg'>
										<img
											src={image.url}
											alt={image.altText}
											className='object-center object-cover hover:opacity-75'
										/>
									</div>
								</Link>
								<h1>{product.title}</h1>
								<h1>
									{product.priceRange.minVariantPrice.amount}
								</h1>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export async function getStaticPaths() {
	const { data } = await storefront(gql`
		{
			products(first: 5) {
				edges {
					node {
						handle
					}
				}
			}
		}
	`);

	return {
		paths: data.products.edges.map((product) => ({
			params: { handle: product.node.handle },
		})),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const { data } = await storefront(singleProductQuery, {
		handle: params.handle,
	});

	return {
		props: {
			product: data.product,
			products: data.products,
		},
	};
}

const gql = String.raw;

const singleProductQuery = gql`
	query SingleProduct($handle: String!) {
		product(handle: $handle) {
			title
			totalInventory
			description
			handle
			id
			updatedAt
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
			variants(first: 1) {
				edges {
					node {
						id
					}
				}
			}
		}
		products(first: 5) {
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

const checkoutMutation = gql`
	mutation CheckoutCreate($variantId: ID!) {
		checkoutCreate(
			input: { lineItems: { variantId: $variantId, quantity: 1 } }
		) {
			checkout {
				webUrl
			}
		}
	}
`;
