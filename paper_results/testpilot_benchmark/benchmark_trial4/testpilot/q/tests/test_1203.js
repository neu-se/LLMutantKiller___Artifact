let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nbind - basic functionality', function(done) {
        // Create a mock node-style callback function
        function mockNodeFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2);
            }, 10);
        }
        
        // Use q.nbind to create a promise-returning function
        const promiseFunc = q.nbind(mockNodeFunction);
        
        promiseFunc(5, 3)
            .then(result => {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
});