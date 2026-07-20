let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.any - handles empty array', function(done) {
        q.any([]).then(function(result) {
            done(new Error('Should not resolve with empty array'));
        }).catch(function(error) {
            assert(error instanceof Error);
            done();
        });
    });
});