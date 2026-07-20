let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delete', function(done) {
        // Create a mock object that implements the dispatch method
        let mockPromise = {
            dispatch: function(method, args) {
                // Verify that delete calls dispatch with correct parameters
                assert.equal(method, 'delete');
                assert.equal(args.length, 1);
                assert.equal(args[0], 'testKey');
                return q.resolve('delete successful');
            }
        };
        
        // Apply the delete method to our mock object
        let deleteMethod = q.makePromise.prototype.delete;
        let result = deleteMethod.call(mockPromise, 'testKey');
        
        // Verify the result is a promise and resolves correctly
        result.then(function(value) {
            assert.equal(value, 'delete successful');
            done();
        }).catch(done);
    });
    
    })