import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCreatePortfolio } from '@/apollo/actions';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';

const PortfolioForm = () => {
	const router = useRouter();
	const [portfolioCreate, { error, loading }] = useCreatePortfolio();

	const { handleSubmit, register, errors, setValue } = useForm();

	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	useEffect(() => {
		if (error) {
			console.log(error);
		}

		register({ name: 'startDate' });
		register({ name: 'endDate' });
	}, [register, error]);

	const handleDateChange = (dateType, setDate) => date => {
		setValue(
			dateType,
			(date && new Date(date.setHours(0, 0, 0, 0)).toISOString()) || date
		);
		setDate(date);
	};

	// const errorMessage = error => {
	// 	let apolloError = error.graphQLErrors[0].message;
	// 	if (apolloError.includes('startDate')) {
	// 		return 'Start date is required!';
	// 	} else {
	// 		return apolloError;
	// 	}
	// };

	const onSubmit = formData => {
		if (formData) {
			portfolioCreate({ variables: formData });
			router.push('/portfolios');
		}

		console.log(formData);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input
						ref={register({ required: true })}
						name="title"
						type="text"
						className="form-control"
					/>
					{errors.title ? (
						<small style={{ color: 'red' }}>Title is required</small>
					) : (
						<small style={{ visibility: 'hidden' }}>Title is required</small>
					)}
				</div>

				<div className="form-group">
					<label htmlFor="city">Company</label>
					<input
						ref={register({ required: true })}
						name="company"
						type="text"
						className="form-control"
					/>
					{errors.company ? (
						<small style={{ color: 'red' }}>Company is required</small>
					) : (
						<small style={{ visibility: 'hidden' }}>Company is required</small>
					)}
				</div>

				<div className="form-group">
					<label htmlFor="city">Company Website</label>
					<input
						ref={register({ required: true })}
						name="companyWebsite"
						type="text"
						className="form-control"
					/>
					{errors.companyWebsite ? (
						<small style={{ color: 'red' }}>Company Website is required</small>
					) : (
						<small style={{ visibility: 'hidden' }}>
							Company Website is required
						</small>
					)}
				</div>

				<div className="form-group">
					<label htmlFor="street">Location</label>
					<input
						ref={register({ required: true })}
						name="location"
						type="text"
						className="form-control"
					/>
					{errors.location ? (
						<small style={{ color: 'red' }}>Location is required</small>
					) : (
						<small style={{ visibility: 'hidden' }}>Location is required</small>
					)}
				</div>

				<div className="form-group">
					<label htmlFor="street">Job Title</label>
					<input
						ref={register({ required: true })}
						name="jobTitle"
						type="text"
						className="form-control"
					/>
					{errors.jobTitle ? (
						<small style={{ color: 'red' }}>Job title is required</small>
					) : (
						<small style={{ visibility: 'hidden' }}>
							Job title is required
						</small>
					)}
				</div>

				<div className="form-group">
					<label htmlFor="description">Description</label>
					<textarea
						ref={register({ required: true })}
						name="description"
						rows="5"
						type="text"
						className="form-control"
					></textarea>
					{errors.description ? (
						<small style={{ color: 'red' }}>Description is required</small>
					) : (
						<small style={{ visibility: 'hidden' }}>
							Description is required
						</small>
					)}
				</div>

				<div className="form-group">
					<label htmlFor="street">Start Date</label>
					<div>
						<DatePicker
							showYearDropdown
							selected={startDate}
							onChange={handleDateChange('startDate', setStartDate)}
						/>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="street">End Date</label>
					<div>
						<DatePicker
							showYearDropdown
							disabled={!endDate}
							selected={endDate}
							onChange={handleDateChange('endDate', setEndDate)}
						/>
					</div>
				</div>
				<div className="form-group">
					{endDate && (
						<button
							type="button"
							className="btn btn-danger"
							onClick={() => handleDateChange('endDate', setEndDate)(null)}
						>
							No End Date
						</button>
					)}
					{!endDate && (
						<button
							type="button"
							className="btn btn-success"
							onClick={() =>
								handleDateChange('endDate', setEndDate)(new Date())
							}
						>
							Set End Date
						</button>
					)}
				</div>

				<button type="submit" className="btn btn-primary">
					Create
				</button>
			</form>
			{/* {error && <div className="alert alert-danger">{errorMessage(error)}</div>} */}
		</>
	);
};

export default PortfolioForm;
