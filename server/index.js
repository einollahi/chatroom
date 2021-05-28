#!/usr/env node
'use strice';
const express = require('express');

const app = express();
const cors = require('cors');

app.use(cors());
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log('server is started at port ', port);
});

const io = require('socket.io')(server, {
	cors: {
		origin: 'http://localhost:4200',
		methods: ['GET', 'POST'],
	},
});

// Chatroom
let userCount = 0;
let users = [];
let currentUser;

io.on('connection', (socket) => {
	socket.on('new message', (data) => {
		socket.broadcast.emit('new message', {
			data,
		});
	});

	socket.on('login', (username) => {
		currentUser = username;
		users.push(username);
		++userCount;

		io.emit('login', {
			users,
			userCount,
		});
	});

	socket.on('disconnect', () => {
		users = users.filter((u) => u != currentUser);
		--userCount;

		socket.broadcast.emit('user disconnect', {
			users,
			userCount,
		});
	});
});
