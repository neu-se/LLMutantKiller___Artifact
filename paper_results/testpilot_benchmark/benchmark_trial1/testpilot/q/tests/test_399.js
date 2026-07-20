let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - basic value fulfillment', function(done) {
        let testValue = { name: 'test', count: 42 };
        let promise = q.fulfill(testValue);
        
        promise.then(function(result) {
            assert.strictEqual(result, testValue);
            done();
        }).catch(done);
    });

    })