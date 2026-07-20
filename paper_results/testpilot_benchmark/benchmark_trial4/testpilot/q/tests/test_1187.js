let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with no additional arguments', function(done) {
        // Create a simple function with no extra args
        function simpleFunction(callback) {
            setTimeout(() => {
                callback(null, 'hello world');
            }, 10);
        }
        
        const boundFunction = q.makePromise(simpleFunction).nbind(null);
        
        boundFunction()
            .then(result => {
                assert.strictEqual(result, 'hello world');
                done();
            })
            .catch(done);
    });
});