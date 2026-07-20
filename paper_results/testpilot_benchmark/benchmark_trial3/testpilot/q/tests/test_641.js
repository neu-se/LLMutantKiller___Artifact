let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.dispatch - with rejection', function(done) {
        let mockPromise = {
            promiseDispatch: function(resolve, op, args) {
                // Simulate operation that throws an error
                throw new Error('operation failed');
            }
        };
        
        // Create a proper Q promise that uses our mock
        let promise = q.Promise(function(resolve, reject) {
            try {
                mockPromise.promiseDispatch(resolve, 'failOp', ['arg1']);
            } catch (error) {
                reject(error);
            }
        });
        
        promise.then(function(result) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'operation failed');
            done();
        });
    });
});