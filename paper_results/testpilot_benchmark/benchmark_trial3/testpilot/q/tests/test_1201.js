let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with simple callback', function(done) {
        // Create a simple node-style callback function
        function nodeStyleFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2);
            }, 10);
        }
        
        // Convert to promise using nbind - bind the first argument (5) and create a promise function
        const promiseFunction = q.nbind(nodeStyleFunction, null, 5);
        
        promiseFunction(3)
            .then(result => {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
});