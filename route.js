module.exports = function (app) {
    app.get('/', function (req, res) {
        require('./pages/markdown')(req, res, app);
    });
    app.get('/upload', function (req, res) {
        require('./pages/upload')(req, res, app);
    });
    app.post('/uploadaction', function (req, res) {
        require('./pages/uploadaction')(req, res, app);
    });
    app.get('/:code', function (req, res) {
        require('./pages/home')(req, res, app);
    });
    app.get('/?key=:code', function (req, res) {
        require('./pages/markdown')(req, res, app);
    });
    app.get('/pay', function (req, res) {
        require('./pages/pay')(req, res.app)
    });
};