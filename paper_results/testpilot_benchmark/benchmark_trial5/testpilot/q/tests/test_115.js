let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.dispatch - successful operation', function(done) {
        // Create a mock promise object with promiseDispatch method
        let mockPromise = {
            promiseDispatch: function(resolve, op, args) {
                // Simulate successful operation
                if (op === 'get' && args[0] === 'testProperty') {
                    resolve('testValue');
                } else {
                    resolve('defaultValue');
                }
            }
        };
        
        // Bind the dispatch method to our mock object
        let dispatch = q.makePromise.prototype.dispatch.bind(mockPromise);
        
        // Test the dispatch method
        let promise = dispatch('get', ['testProperty']);
        
        promise.then(function(result) {
            assert.equal(result, 'testValue');
            done();
        }).catch(done);
    });

    })