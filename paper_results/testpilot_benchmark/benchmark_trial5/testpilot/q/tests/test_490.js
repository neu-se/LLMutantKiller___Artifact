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
        
        // Make the mockObject a proper Q object by wrapping it
        let qObject = q(mockObject);
        
        q.set(qObject, 'testKey', 'testValue')
            .then(function(result) {
                assert.strictEqual(result.testKey, 'testValue');
                done();
            })
            .catch(done);
    });
});