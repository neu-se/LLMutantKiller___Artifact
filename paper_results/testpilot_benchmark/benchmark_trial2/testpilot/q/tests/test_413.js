let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - basic value fulfillment', function(done) {
        let value = { name: 'test', count: 42 };
        let promise = q.fulfill(value);
        
        promise.then(function(result) {
            assert.strictEqual(result, value);
            done();
        }).catch(done);
    });

    })