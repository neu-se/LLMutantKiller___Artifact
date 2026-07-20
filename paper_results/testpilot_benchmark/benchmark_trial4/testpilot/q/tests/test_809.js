let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - basic functionality', function(done) {
        // Create a promise that resolves to a function
        let testFunction = function(a, b, c) {
            return a + b + c;
        };
        
        let promise = q.resolve(testFunction);
        
        // Use fbind to partially apply arguments
        let boundFunction = promise.fbind(1, 2);
        
        // Call the bound function
        boundFunction(3).then(function(result) {
            assert.equal(result, 6); // 1 + 2 + 3 = 6
            done();
        }).catch(done);
    });
});