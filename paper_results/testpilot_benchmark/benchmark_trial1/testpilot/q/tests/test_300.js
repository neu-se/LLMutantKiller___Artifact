let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify - with multiple arguments', function(done) {
        // Mock a Node.js-style function with multiple parameters
        function mockAsyncFunction(arg1, arg2, arg3, callback) {
            setTimeout(() => {
                callback(null, `${arg1}-${arg2}-${arg3}`);
            }, 10);
        }

        let promise = q.makePromise(function(resolve, reject) {
            resolve(mockAsyncFunction);
        });

        let denodeified = promise.denodeify();
        
        denodeified('a', 'b', 'c')
            .then(result => {
                assert.strictEqual(result, 'a-b-c');
                done();
            })
            .catch(done);
    });

    })