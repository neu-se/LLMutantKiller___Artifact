let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should handle rejected thenables', function(done) {
        let thenable = {
            then: function(onFulfilled, onRejected) {
                setTimeout(function() {
                    onRejected(new Error('thenable error'));
                }, 10);
            }
        };
        
        let promise = q(thenable);
        
        promise.then(function() {
            done(new Error('Should have been rejected'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'thenable error');
            done();
        });
    });
});