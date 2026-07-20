let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with only fulfilled callback', function(done) {
        let promise = q.resolve('test value');
        
        promise.done(function(value) {
            assert.equal(value, 'test value');
            done();
        });
    });
});