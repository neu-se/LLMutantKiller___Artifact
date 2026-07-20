let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill with object value', function(done) {
        let testObj = { name: 'test', value: 123 };
        let promise = q.fulfill(testObj);
        
        promise.then(function(value) {
            assert.deepStrictEqual(value, testObj);
            assert.strictEqual(value, testObj); // Should be the same reference
            done();
        }).catch(done);
    });
});