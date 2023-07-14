import { storefront } from '../../utils';
import { useState } from 'react';

export default function Example({ product }) {
	const [show, setShow] = useState(false);
	const [show2, setShow2] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const image = product.images.edges[0].node;
	const variantId = product.variants.edges[0].node.id;

	async function checkout() {
		setIsLoading(true);
		const { data } = await storefront(checkoutMutation, { variantId });
		const { webUrl } = data.checkoutCreate.checkout;
		window.location.href = webUrl;
	}
	return (
		<div className='md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4'>
			<div className='xl:w-2/6 lg:w-2/5 w-80 block'>
				<img
					className='w-full rounded-xl'
					alt='img of a girl posing'
					src={image.url}
				/>
			</div>

			<div className='xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6'>
				<div className='border-b border-gray-200 pb-6'>
					<p className='text-sm leading-none text-gray-600'>
						Ferr's Wares Collection
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
				<div className='py-4 border-b border-gray-200 flex items-center justify-between'>
					<p className='text-base leading-4 text-gray-800'>Colours</p>
					<div className='flex items-center justify-center'>
						<p className='text-sm leading-none text-gray-600'>
							Smoke Blue with red accents
						</p>
						<div
							className='
								w-6
								h-6
								bg-gradient-to-b
								from-gray-900
								to-indigo-500
								ml-3
								mr-4
								cursor-pointer
							'
						></div>
						<svg
							className='cursor-pointer'
							width='6'
							height='10'
							viewBox='0 0 6 10'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M1 1L5 5L1 9'
								stroke='#4B5563'
								strokeWidth='1.25'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>
				</div>
				<div className='py-4 border-b border-gray-200 flex items-center justify-between'>
					<p className='text-base leading-4 text-gray-800'>Size</p>
					<div className='flex items-center justify-center'>
						<p className='text-sm leading-none text-gray-600 mr-3'>
							38.2
						</p>
						<svg
							className='cursor-pointer'
							width='6'
							height='10'
							viewBox='0 0 6 10'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M1 1L5 5L1 9'
								stroke='#4B5563'
								strokeWidth='1.25'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>
				</div>
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
				<div>
					<p className='xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7'>
						{product.description}
					</p>
					<p className='text-base leading-4 mt-7 text-gray-600'></p>
					<p className='text-base leading-4 mt-4 text-gray-600'>
						Length: 13.2 inches
					</p>
					<p className='text-base leading-4 mt-4 text-gray-600'>
						Height: 10 inches
					</p>
					<p className='text-base leading-4 mt-4 text-gray-600'>
						Depth: 5.1 inches
					</p>
					<p className='md:w-96 text-base leading-normal text-gray-600 mt-4'>
						Composition: 100% calf leather, inside: 100% lamb
						leather
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
		},
	};
}

const gql = String.raw;

const singleProductQuery = gql`
	query SingleProduct($handle: String!) {
		product(handle: $handle) {
			title
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
