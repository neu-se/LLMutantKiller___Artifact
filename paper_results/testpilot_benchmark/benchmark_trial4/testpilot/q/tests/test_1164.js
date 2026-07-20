let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify - with context binding', function(done) {
        // Create an object with a method that uses 'this'
        const testObject = {
            prefix: 'Object: ',
            nodeMethod: function(value, callback) {
                setTimeout(() => {
                    callback(null, this.prefix + value);
                }, 10);
            }
        };

        const promise = q.makePromise(function(resolve, reject) {
            resolve('test');
        });

        const denodeified = promise.denodeify(testObject.nodeMethod, testObject);
        
        denodeified('hello')
            .then(result => {
                assert.strictEqual(result, 'Object: hello');
                done();
            })
            .catch(done);
    });
});