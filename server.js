const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
    helmet({
        noCache: true
    })
);
app.use(
    hsts({
        maxAge: 15552000 // 180 days in seconds
    })
);

app.use(
    express.static(path.join(__dirname, 'dist/polling'), {
        etag: false
    })
);

/* LOGIN *************************************************************** */

/**
 * Post Login Data
 */
app.post('/api/login', (req, res) => {
    var details = req.body;
    request('http://localhost:3000/accounts', (err, response, body) => {
        if (response.statusCode <= 500) {
            let allAccounts = JSON.parse(body);
            let accountExists = allAccounts.map(e => {
                if ((e.email === details.email) && (e.password === details.password)) {
                    return true;
                }
            });
            if (accountExists[0]) {
                res.send({token: 'TOKEN'});
            } else {
                return console.error('upload failed:', err);
            }
        }
    });
});

/* USERS *************************************************************** */

/**
 * Get all user data
 */
app.get('/api/users', (req, res) => {
    request('http://localhost:3000/users', (err, response, body) => {
        if (response.statusCode <= 500) {
            res.send(body);
        }
    });
});

/**
 * Get user by ID
 */
app.get('/api/users/:id', (req, res) => {
    request('http://localhost:3000/users', (err, response, body) => {
        if (response.statusCode <= 500) {
            let allMembers = JSON.parse(body);
            let userId = req.params.id.split(',');
            if (userId.length > 1) {
                res.send(JSON.stringify(allMembers.filter(res => {
                    let value = userId.filter(element => {
                        if (res.id == element) {
                            return res;
                        }
                    });
                    if (res.id == value[0]) {
                        return res;
                    }
                })))
            } else {
                res.send(JSON.stringify(allMembers.find(res => { return res.id == req.params.id })))
            }
        }
    });
});

/**
 * Create user account
 */
app.post('/api/users', (req, res) => {
    var details = req.body;
    request.post('http://localhost:3000/users', { form: details }, (err, response, body) => {
        if (err) {
            return console.error('upload failed:', err);
        } else {
            res.send(body)
        }
    });
});

/**
 * Edit user by ID
 */
app.put('/api/users/:id', (req, res) => {
    var details = req.body;
    request.put('http://localhost:3000/users/' + req.params.id, { form: details }, (err, response, body) => {
        if (err) {
            return console.error('upload failed:', err);
        } else {
            res.send(body)
        }
    });
});

/**
 * Delete member data via ID
 */
app.delete('/api/users/:id', (req, res) => {
    request.delete('http://localhost:3000/users/' + req.params.id, (err, response, body) => {
        if (err) {
            return console.error('upload failed:', err);
        } else {
            res.send(body)
        }
    });
});

/* Polls *************************************************************** */

/**
 * Get all poll data
 */
app.get('/api/polls', (req, res) => {
    request('http://localhost:3000/polls', (err, response, body) => {
        if (response.statusCode <= 500) {
            res.send(body);
        }
    });
});

/**
 * Get polls by ID
 */
app.get('/api/polls/:id', (req, res) => {
    request('http://localhost:3000/polls', (err, response, body) => {
        if (response.statusCode <= 500) {
            let allMembers = JSON.parse(body);
            res.send(JSON.stringify(allMembers.find(res => { return res.id == req.params.id })))
        }
    });
});

/**
 * Create poll
 */
app.post('/api/polls', (req, res) => {
    var details = req.body;
    request.post({ url: 'http://localhost:3000/polls', method: 'post', body: details, json: true }, (err, response, body) => {
        if (err) {
            return console.error('upload failed:', err);
        } else {
            res.send(body)
        }
    });
});

/**
 * Edit polls by ID
 */
app.put('/api/polls/:id', (req, res) => {
    var details = req.body;
    request.put({ url: 'http://localhost:3000/polls/' + req.params.id, method: 'post', body: details, json: true }, (err, response, body) => {
        if (err) {
            return console.error('upload failed:', err);
        } else {
            res.send(body)
        }
    });
});


/**
 * Delete polls
 */
app.delete('/api/polls/:id', (req, res) => {
    request.delete('http://localhost:3000/polls/' + req.params.id, (err, response, body) => {
        if (err) {
            return console.error('upload failed:', err);
        } else {
            res.send(body)
        }
    });
});

/* App Response *************************************************************** */

/**
 * App Response
 */
app.put('/api/response/:id', (req, res) => {
    var details = req.body;
    details.responses++;
    request.put({ url: 'http://localhost:3000/polls/' + req.params.id, method: 'post', body: details, json: true }, (err, response, body) => {
        if (err) {
            return console.error('upload failed:', err);
        } else {
            res.send(body)
        }
    });
});

/* Poll Status *************************************************************** */

/**
 * Get all poll status data
 */
app.get('/api/status', (req, res) => {
    request('http://localhost:3000/status', (err, response, body) => {
        if (response.statusCode <= 500) {
            res.send(body);
        }
    });
});

/**
 * Get poll status by poll ID
 */
app.get('/api/pollStatus/:id', (req, res) => {
    request('http://localhost:3000/status', (err, response, body) => {
        if (response.statusCode <= 500) {
            let allMembers = JSON.parse(body);
            res.send(JSON.stringify(allMembers.filter(res => { return res.pollId == req.params.id })))
        }
    });
});

/**
 * Get poll status by user ID
 */
app.get('/api/userStatus/:id', (req, res) => {
    request('http://localhost:3000/status', (err, response, body) => {
        if (response.statusCode <= 500) {
            let allMembers = JSON.parse(body);
            res.send(JSON.stringify(allMembers.filter(res => { return res.userId == req.params.id })))
        }
    });
});

/**
 * Create poll status
 */
app.post('/api/status', (req, res) => {
    var details = req.body;
    request.post({url: 'http://localhost:3000/status', method: 'post', body: details, json: true }, (err, response, body) => {
        if (err) {
            return console.error('upload failed:', err);
        } else {
            res.send(body)
        }
    });
});

/**
 * Delete poll status
 */
app.delete('/api/status/:id', (req, res) => {
    request.delete('http://localhost:3000/status/' + req.params.id, (err, response, body) => {
        if (err) {
            return console.error('upload failed:', err);
        } else {
            res.send(body)
        }
    });
});

/* Stats *************************************************************** */

/**
 * Get global stats data
 */
app.get('/api/stats', (req, res) => {
    request('http://localhost:3000/stats', (err, response, body) => {
        if (response.statusCode <= 500) {
            res.send(body);
        }
    });
});

/* ECT *************************************************************** */

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/polling/index.html'));
});

app.listen('8000', () => {
    console.log('Vrrrum Vrrrum! Server starting!');
});