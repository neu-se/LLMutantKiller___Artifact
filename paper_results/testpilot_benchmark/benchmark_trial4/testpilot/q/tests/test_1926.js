let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.keys with promise that rejects', function(done) {
        let promise = q.reject(new Error('Test error'));
        q.keys(promise)
            .then(function() {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Test error');
                done();
            });
    });
});