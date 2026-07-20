let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind - basic functionality', function(done) {
        // Create a mock Node.js-style callback function
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `result: ${arg1} + ${arg2}`);
            }, 10);
        }
        
        // Use q.nbind to create a promise-returning function bound to specific context and arguments
        let boundFunc = q.nbind(mockAsyncFunction, null, 'hello');
        
        // Test that it returns a promise and works correctly
        boundFunc('world').then(result => {
            assert.equal(result, 'result: hello + world');
            done();
        }).catch(done);
    });
});