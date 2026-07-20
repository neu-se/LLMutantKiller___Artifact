let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should create a resolved promise with an object value', function(done) {
        let testObj = { name: 'test', value: 123 };
        let promise = q(testObj);
        promise.then(function(result) {
            assert.deepStrictEqual(result, testObj);
            assert.strictEqual(result, testObj); // Should be the same reference
            done();
        }).catch(done);
    });

    })