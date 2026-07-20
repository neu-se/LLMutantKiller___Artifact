let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.keys with rejected promise', function(done) {
        let rejectedPromise = q.reject(new Error('test error'));
        q.keys(rejectedPromise).then(function(keys) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'test error');
            done();
        });
    });
});