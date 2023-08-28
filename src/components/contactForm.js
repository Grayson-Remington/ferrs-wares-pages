import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
function ContactForm() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const [state, handleSubmit] = useForm('mrgwqvjw');
	if (state.succeeded) {
		return (
			<p className='mx-auto flex flex-col items-center justify-center w-full pb-10 brightness-100 bg-gray-200 bg-opacity-50 p-6'>
				Your message has been sent! I will be in contact shortly!
			</p>
		);
	}
	return (
		<div
			id='contactform'
			className='mx-auto flex flex-col w-full pb-10 brightness-100 bg-gray-200 bg-opacity-50 p-6'
		>
			<div className='flex items-center justify-center'>
				<form
					onSubmit={handleSubmit}
					className='flex w-full max-w-2xl flex-col items-center px-10 md:w-9/12'
				>
					<div className='mb-8 text-3xl italic'>Have a Request?</div>
					<input
						className='w-full rounded-md border-2 p-2 focus:outline-none'
						id='name'
						type='text'
						placeholder='Name'
					/>
					<ValidationError
						prefix='Name'
						field='name'
						errors={state.errors}
					/>
					<input
						className='my-2 w-full rounded-md border-2 p-2 focus:outline-none'
						id='email'
						type='email'
						placeholder='Email'
					/>
					<ValidationError
						prefix='Email'
						field='email'
						errors={state.errors}
					/>
					<textarea
						rows={3}
						id='message'
						name='message'
						placeholder='Message'
						className='mb-4 w-full rounded-md  border-2 p-2 focus:outline-none'
					/>
					<ValidationError
						prefix='Message'
						field='message'
						errors={state.errors}
					/>
					<button
						type='submit'
						className='inline-block w-max rounded-md bg-pink-200 px-8 py-3 text-center text-base font-medium text-pink-700 shadow'
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default ContactForm;
