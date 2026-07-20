let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfcall - multiple arguments', function(done) {
        // Mock function that takes multiple arguments plus callback
        function mockMultiArgFunction(a, b, c, d, callback) {
            setTimeout(() => {
                callback(null, a * b + c * d);
            }, 10);
        }
        
        let promise = q.makePromise(mockMultiArgFunction, this);
        
        promise.nfcall(2, 3, 4, 5)
            .then(result => {
                assert.strictEqual(result, 26); // 2*3 + 4*5 = 6 + 20 = 26
                done();
            })
            .catch(done);
    });

    })