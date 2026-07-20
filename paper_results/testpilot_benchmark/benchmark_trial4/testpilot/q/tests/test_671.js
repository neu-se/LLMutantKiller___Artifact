let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set', function(done) {
        // Create a mock object that implements the dispatch method
        let mockPromise = {
            dispatch: function(method, args) {
                // Verify that set calls dispatch with correct parameters
                assert.equal(method, 'set');
                assert.equal(args.length, 2);
                assert.equal(args[0], 'testKey');
                assert.equal(args[1], 'testValue');
                return q.resolve('dispatch called successfully');
            }
        };
        
        // Apply the set method to our mock object
        let result = q.makePromise.prototype.set.call(mockPromise, 'testKey', 'testValue');
        
        // Verify the result is a promise and resolves correctly
        result.then(function(value) {
            assert.equal(value, 'dispatch called successfully');
            done();
        }).catch(done);
    });
    
    })