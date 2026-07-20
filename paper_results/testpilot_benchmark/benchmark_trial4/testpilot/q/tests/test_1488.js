let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - when method returns value', function(done) {
        let testValue = 'hello world';
        let promise = q.fulfill(testValue);
        
        // Test the when method properly with a callback
        promise.then(function(result) {
            assert.strictEqual(result, testValue);
            done();
        }).catch(done);
    });
});