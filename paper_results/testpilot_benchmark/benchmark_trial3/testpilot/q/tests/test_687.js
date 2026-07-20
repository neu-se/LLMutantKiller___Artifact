let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set', function(done) {
        // Create a mock object that implements the dispatch method
        let mockPromise = {
            dispatch: function(method, args) {
                // Verify that the correct method and arguments are passed
                assert.equal(method, 'set');
                assert.equal(args.length, 2);
                assert.equal(args[0], 'testKey');
                assert.equal(args[1], 'testValue');
                
                // Return a resolved promise to simulate successful dispatch
                return q.resolve('dispatch called successfully');
            }
        };
        
        // Bind the set method to our mock object
        let setMethod = q.makePromise.prototype.set.bind(mockPromise);
        
        // Call the set method
        let result = setMethod('testKey', 'testValue');
        
        // Verify the result is a promise
        assert(q.isPromise(result));
        
        // Verify the promise resolves correctly
        result.then(function(value) {
            assert.equal(value, 'dispatch called successfully');
            done();
        }).catch(done);
    });
});