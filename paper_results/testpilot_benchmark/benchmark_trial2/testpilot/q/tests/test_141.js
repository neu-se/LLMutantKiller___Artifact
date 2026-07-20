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
        
        // Bind the delete method to our mock object
        let deleteMethod = q.makePromise.prototype.delete.bind(mockPromise);
        
        // Call the delete method
        let result = deleteMethod('testKey');
        
        // Verify it returns a promise
        assert(q.isPromise(result));
        
        // Verify the promise resolves correctly
        result.then(function(value) {
            assert.equal(value, 'delete successful');
            done();
        }).catch(done);
    });
    
    })