/**
 * Author : Swapnil Patil
**/

const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.post('/blogs/:id', addBlog);
router.get('/blogs/:id', getAllBlog);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    console.log('....... req', req.body);
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function addBlog(req, res, next) {
    userService.addBlog(req.params.id, req.body)
        .then(() => res.json({status : 'Blogs Updated'}))
        .catch(err => next(err));
}

function getAllBlog(req, res, next){
    userService.getById(req.params.id)
        .then(user => { 
            if(user) {
                console.log('....... user', user);
                res.json(user.blogs);
            } else {
                res.sendStatus(404)
            }
            // user ? res.json(user.blogs) : res.sendStatus(404)
        })
        .catch(err => next(err));
}
