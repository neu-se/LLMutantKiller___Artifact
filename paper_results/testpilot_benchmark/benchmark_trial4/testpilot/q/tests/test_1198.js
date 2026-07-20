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

        // Use q.nbind to bind the method to the object
        const boundMethod = q.nbind(testObject.asyncMethod, testObject);
        
        boundMethod('test-input')
            .then(result => {
                assert.strictEqual(result, 'PREFIX: test-input');
                done();
            })
            .catch(done);
    });
});