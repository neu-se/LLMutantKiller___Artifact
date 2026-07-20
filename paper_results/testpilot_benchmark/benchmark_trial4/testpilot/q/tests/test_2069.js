let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with fulfilled callback and rejected callback', function(done) {
        let rejectedPromise = q.reject(new Error('rejection test'));
        
        q.done(rejectedPromise, 
            function(value) {
                // Should not be called
                assert.fail('Fulfilled callback should not be called');
            },
            function(reason) {
                assert.equal(reason.message, 'rejection test');
                done();
            }
        );
    });

    })