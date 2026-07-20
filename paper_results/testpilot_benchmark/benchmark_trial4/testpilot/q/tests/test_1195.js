let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with object method', function(done) {
        // Create a mock object with an async method
        const testObject = {
            prefix: 'PREFIX',
            asyncMethod: function(input, callback) {
                setTimeout(() => {
                    callback(null, `${this.prefix}: ${input}`);
                }, 10);
            }
        };

        // Create a promise from the object's method
        const promise = q.makePromise(testObject.asyncMethod);
        
        // Test nbind with the object as context
        const boundMethod = promise.nbind(testObject);
        
        boundMethod('test-input')
            .then(result => {
                assert.strictEqual(result, 'PREFIX: test-input');
                done();
            })
            .catch(done);
    });

    })