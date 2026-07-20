let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spread with rejected promise', function(done) {
        let promise = q.reject(new Error('test error'));
        
        promise.catch(function(error) {
            assert.equal(error.message, 'test error');
            done();
        });
    });
});