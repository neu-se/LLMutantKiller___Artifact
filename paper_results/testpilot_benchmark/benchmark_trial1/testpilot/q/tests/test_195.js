let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - with context binding', function(done) {
        let testObject = {
            value: 10,
            multiply: function(a, b) {
                return this.value * a * b;
            }
        };
        
        // Use q.fbind directly to bind the function with context and partial arguments
        let boundFunction = q.fbind(testObject.multiply, testObject, 2);
        
        boundFunction(3)
            .then(function(result) {
                assert.equal(result, 60); // 10 * 2 * 3 = 60
                done();
            })
            .catch(done);
    });
});