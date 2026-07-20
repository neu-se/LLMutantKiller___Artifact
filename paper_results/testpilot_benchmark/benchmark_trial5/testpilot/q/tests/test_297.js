let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with no arguments', function(done) {
        // Create a mock function that takes no arguments except callback
        function mockAsyncFunctionNoArgs(callback) {
            setTimeout(() => {
                callback(null, 'success');
            }, 10);
        }
        
        q.nfcall(mockAsyncFunctionNoArgs)
            .then(result => {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });
});