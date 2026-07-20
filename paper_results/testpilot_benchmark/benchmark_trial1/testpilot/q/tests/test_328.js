let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind - with pre-bound arguments', function(done) {
        function mockNodeFunction(prefix, suffix, value, callback) {
            setTimeout(() => {
                callback(null, prefix + value + suffix);
            }, 10);
        }
        
        // Use q.nbind to create a promise-returning function with pre-bound arguments
        const boundFunc = q.nbind(mockNodeFunction, null, 'Hello ', '!');
        
        boundFunc('World')
            .then(result => {
                assert.strictEqual(result, 'Hello World!');
                done();
            })
            .catch(done);
    });
});