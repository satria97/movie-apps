const {
	addMovieHandler,
	getAllMoviesHandler,
	getMovieByIdHandler,
	editMovieByIdHandler,
	deleteMovieByIdHandler,
} = require('./handler');

const routes = [
	{
		method: 'POST',
		path: '/Movies',
		handler: addMovieHandler,
	},
	{
		method: 'GET',
		path: '/Movies',
		handler: getAllMoviesHandler,
	},
	{
		method: 'GET',
		path: '/Movies/{id}',
		handler: getMovieByIdHandler,
	},
	{
		method: 'PUT',
		path: '/Movies/{id}',
		handler: editMovieByIdHandler,
	},
	{
		method: 'DELETE',
		path: '/notes/{id}',
		handler: deleteMovieByIdHandler,
	},
];

module.exports = routes;
