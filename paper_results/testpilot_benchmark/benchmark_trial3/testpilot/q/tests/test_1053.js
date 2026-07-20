let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.done', function() {
        
        it('should call fulfilled callback when promise resolves', function(done) {
            let called = false;
            q.resolve('test value').done(function(value) {
                called = true;
                assert.equal(value, 'test value');
                done();
            });
        });

    });
});