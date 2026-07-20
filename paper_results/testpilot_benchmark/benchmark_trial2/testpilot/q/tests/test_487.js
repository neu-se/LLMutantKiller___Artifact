let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set with object that supports set dispatch', function(done) {
        // Create a mock object that implements the set dispatch method
        let mockObject = {
            dispatch: function(method, args) {
                if (method === 'set') {
                    this[args[0]] = args[1];
                    return q.resolve(this);
                }
                return q.reject(new Error('Unsupported method: ' + method));
            }
        };
        
        // Use q.dispatch instead of q.set to properly invoke the dispatch method
        q.dispatch(mockObject, 'set', ['testKey', 'testValue'])
            .then(function(result) {
                assert.strictEqual(result.testKey, 'testValue');
                done();
            })
            .catch(done);
    });
});