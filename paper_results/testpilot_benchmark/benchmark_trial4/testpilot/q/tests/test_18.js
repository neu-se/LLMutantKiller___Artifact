let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should handle rejected thenables', function(done) {
        let rejectingThenable = {
            then: function(onFulfilled, onRejected) {
                setTimeout(function() {
                    onRejected(new Error('thenable error'));
                }, 10);
            }
        };
        
        let result = q(rejectingThenable);
        
        result.then(function(value) {
            done(new Error('Should have been rejected'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'thenable error');
            done();
        });
    });
    
    })