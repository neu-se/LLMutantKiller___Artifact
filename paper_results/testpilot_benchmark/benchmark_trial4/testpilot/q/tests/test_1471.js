let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - when method returns value', function(done) {
        let testValue = 'hello world';
        let promise = q.fulfill(testValue);
        
        // Test the when method directly on the promise object
        let whenResult = promise.when();
        assert.strictEqual(whenResult, testValue);
        done();
    });

    })