let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - delete method removes properties', function(done) {
        let testObj = { prop1: 'value1', prop2: 'value2' };
        let promise = q.fulfill(testObj);
        
        promise.delete('prop1');
        
        assert.strictEqual(testObj.prop1, undefined);
        assert.strictEqual(testObj.prop2, 'value2');
        assert.strictEqual('prop1' in testObj, false);
        done();
    });

    })