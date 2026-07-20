let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spread with fulfilled promise and empty array', function(done) {
        let promise = q.resolve([]);
        
        q.spread(promise, function() {
            assert.equal(arguments.length, 0);
            done();
        }, function(error) {
            done(error);
        });
    });
});