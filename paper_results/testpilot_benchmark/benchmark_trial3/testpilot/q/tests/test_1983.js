let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch with catch handler that throws', function(done) {
        let promise = q.reject(new Error('Original error'));
        
        q.catch(promise, function(error) {
            throw new Error('Error in catch handler');
        }).then(function(result) {
            // Should not reach here
            done(new Error('Promise should have been rejected'));
        }).catch(function(error) {
            assert(error instanceof Error);
            assert.strictEqual(error.message, 'Error in catch handler');
            done();
        });
    });

    })