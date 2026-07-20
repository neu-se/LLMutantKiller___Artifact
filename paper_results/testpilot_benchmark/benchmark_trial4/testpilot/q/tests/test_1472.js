let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - get method accesses properties', function(done) {
        let testObj = { prop1: 'value1', prop2: 123 };
        let promise = q.fulfill(testObj);
        
        assert.strictEqual(promise.get('prop1'), 'value1');
        assert.strictEqual(promise.get('prop2'), 123);
        assert.strictEqual(promise.get('nonexistent'), undefined);
        done();
    });

    })