let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfcall - multiple arguments', function(done) {
        // Mock function that takes multiple arguments plus callback
        function mockMultiArgFunction(a, b, c, d, callback) {
            setTimeout(() => {
                callback(null, [a, b, c, d]);
            }, 10);
        }
        
        q.nfcall(mockMultiArgFunction, 'arg1', 'arg2', 'arg3', 'arg4')
            .then(result => {
                assert.deepStrictEqual(result, ['arg1', 'arg2', 'arg3', 'arg4']);
                done();
            })
            .catch(done);
    });
});