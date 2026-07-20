let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.dispatch - basic operation', function(done) {
        // Create a mock promise object with promiseDispatch method
        let mockPromise = {
            promiseDispatch: function(resolve, op, args) {
                // Simulate successful operation
                resolve('success result');
            }
        };
        
        // Bind the dispatch method to our mock object
        let dispatch = q.makePromise.prototype.dispatch.bind(mockPromise);
        
        // Test the dispatch function
        let promise = dispatch('testOp', ['arg1', 'arg2']);
        
        promise.then(function(result) {
            assert.equal(result, 'success result');
            done();
        }).catch(done);
    });

    })