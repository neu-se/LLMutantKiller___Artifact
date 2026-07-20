let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nearer with non-promise value', function(done) {
        // Test with various non-promise values
        let stringValue = "hello";
        let numberValue = 123;
        let objectValue = { key: "value" };
        let nullValue = null;
        let undefinedValue = undefined;
        
        // q.nearer should return the value as-is for non-promises
        assert.strictEqual(q.nearer(stringValue), stringValue);
        assert.strictEqual(q.nearer(numberValue), numberValue);
        assert.strictEqual(q.nearer(objectValue), objectValue);
        assert.strictEqual(q.nearer(nullValue), nullValue);
        assert.strictEqual(q.nearer(undefinedValue), undefinedValue);
        done();
    });
    
    })