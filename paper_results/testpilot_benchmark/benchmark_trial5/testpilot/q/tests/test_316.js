let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with no pre-bound arguments', function(done) {
        function simpleFunction(value, callback) {
            setTimeout(() => {
                callback(null, value * 2);
            }, 10);
        }
        
        const promiseFunction = q.makePromise(simpleFunction);
        
        // Bind only context (null), no arguments
        const boundFunction = promiseFunction.nbind(null);
        
        boundFunction(21)
            .then(result => {
                assert.strictEqual(result, 42);
                done();
            })
            .catch(done);
    });
});