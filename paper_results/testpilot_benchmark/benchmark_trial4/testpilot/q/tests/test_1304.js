let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.when with undefined callbacks', function(done) {
        let promise = q.resolve('test');
        
        // Should not throw when callbacks are undefined
        let result = q.when(promise);
        result.then(function(value) {
            assert.equal(value, 'test');
            done();
        }).catch(done);
    });
});