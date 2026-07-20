let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test denodeify returns a function', function() {
        function mockFunction(callback) {
            callback(null, 'result');
        }

        let promise = q.makePromise(function(resolve) {
            resolve('test');
        });

        let denodeified = promise.denodeify(mockFunction);
        
        assert.strictEqual(typeof denodeified, 'function');
    });
});