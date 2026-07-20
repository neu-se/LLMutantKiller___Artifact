let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fapply with rejected promise', function(done) {
        let rejectedPromise = q.reject(new Error('rejected function'));
        
        q.fapply(rejectedPromise, ['arg1', 'arg2'])
            .then(function(result) {
                done(new Error('Should have been rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'rejected function');
                done();
            });
    });
});