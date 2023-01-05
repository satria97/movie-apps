const { nanoid } = require('nanoid');
const movies = require('./movies');

const addMovieHandler = (request, h) => {
	const { title, description, rating } = request.payload;

	const id = nanoid(16);
	const image = '';
	const createdAt = new Date().toString();
	const updatedAt = createdAt;

	const newMovie = {
		id,
		title,
		description,
		rating,
		image,
		createdAt,
		updatedAt,
	};

	movies.push(newMovie);

	const isSuccess = movies.filter((movie) => movie.id === id).length > 0;

	if (isSuccess) {
		const response = h.response({
			status: 'success',
			message: 'Movie berhasil ditambahkan',
			data: {
				movies,
			},
		});
		response.code(201);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Movie gagal ditambahkan',
	});
	response.code(500);
	return response;
};

const getAllMoviesHandler = () => ({
	status: 'success',
	data: {
		movies,
	},
});

const getMovieByIdHandler = (request, h) => {
	const { id } = request.params;

	const movie = movies.filter((m) => m.id === id)[0];

	if (movie !== undefined) {
		return {
			status: 'success',
			data: {
				movie,
			},
		};
	}

	const response = h.response({
		status: 'fail',
		message: 'Movie tidak ditemukan',
	});
	response.code(404);
	return response;
};

const editMovieByIdHandler = (request, h) => {
	const { id } = request.params;

	const { title, description, rating } = request.payload;
	const updatedAt = new Date().toString();

	const index = movies.findIndex((movie) => movie.id === id);

	if (index !== -1) {
		movies[index] = {
			...movies[index],
			title,
			description,
			rating,
			updatedAt,
		};
		const response = h.response({
			status: 'success',
			message: 'Movie berhasil diperbarui',
		});
		response.code(200);
		return response;
	}
	const response = h.response({
		status: 'fail',
		message: 'Gagal memperbarui movie. Id tidak ditemukan',
	});
	response.code(404);
	return response;
};

const deleteMovieByIdHandler = (request, h) => {
	const { id } = request.params;

	const index = movies.findIndex((movie) => movie.id === id);

	if (index !== -1) {
		movies.splice(index, 1);
		const response = h.response({
			status: 'success',
			message: 'Movie berhasil dihapus',
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Movie gagal dihapus. Id tidak ditemukan',
	});
	response.code(404);
	return response;
};

module.exports = {
	addMovieHandler,
	getAllMoviesHandler,
	getMovieByIdHandler,
	editMovieByIdHandler,
	deleteMovieByIdHandler,
};
