let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should use custom error message when provided', function(done) {
        let promise = q.delay(100).then(() => 'success');
        let customError = 'Custom timeout error';
        
        q.timeout(promise, 50, customError)
            .then(() => {
                done(new Error('Should have timed out'));
            })
            .catch(error => {
                assert.equal(error.message, customError);
                done();
            });
    });

    })