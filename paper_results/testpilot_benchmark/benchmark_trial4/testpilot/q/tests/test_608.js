let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with empty array', function(done) {
        let promise = q.resolve([]);
        
        promise.spread(function() {
            assert.equal(arguments.length, 0);
            done();
        }, function(error) {
            done(error);
        });
    });
});