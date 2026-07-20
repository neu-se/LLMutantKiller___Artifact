let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - success case', function(done) {
        // Create a mock function that follows Node.js callback convention
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `result: ${arg1} ${arg2}`);
            }, 10);
        }
        
        // Convert to promise and test nfapply
        const promisified = q.denodeify(mockAsyncFunction);
        
        promisified.nfapply(['hello', 'world'])
            .then(result => {
                assert.strictEqual(result, 'result: hello world');
                done();
            })
            .catch(done);
    });

    })