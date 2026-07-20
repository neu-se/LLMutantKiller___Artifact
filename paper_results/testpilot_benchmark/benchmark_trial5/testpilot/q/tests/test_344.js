let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - method with multiple arguments', function(done) {
        let mockObject = {
            multiArgMethod: function(str, num, bool, callback) {
                setTimeout(() => {
                    callback(null, {
                        string: str,
                        number: num,
                        boolean: bool
                    });
                }, 10);
            }
        };
        
        // Use Q.nbind to create a promisified version of the method
        let promisedMethod = q.nbind(mockObject.multiArgMethod, mockObject);
        
        promisedMethod('hello', 42, true)
            .then(function(result) {
                assert.equal(result.string, 'hello');
                assert.equal(result.number, 42);
                assert.equal(result.boolean, true);
                done();
            })
            .catch(done);
    });
});