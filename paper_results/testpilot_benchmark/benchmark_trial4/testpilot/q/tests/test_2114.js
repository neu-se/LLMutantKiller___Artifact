let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should handle already rejected promise', function(done) {
        let promise = q.reject(new Error('already rejected'));
        
        q.timeout(promise, 100)
            .then(() => {
                done(new Error('Should have been rejected'));
            })
            .catch(error => {
                assert.equal(error.message, 'already rejected');
                done();
            });
    });

    })