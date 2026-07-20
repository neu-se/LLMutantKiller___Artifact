let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with single element array', function(done) {
        let promise = q.resolve(['hello']);
        
        promise.spread(function(greeting) {
            assert.equal(greeting, 'hello');
            done();
        }, function(error) {
            done(error);
        });
    });
});