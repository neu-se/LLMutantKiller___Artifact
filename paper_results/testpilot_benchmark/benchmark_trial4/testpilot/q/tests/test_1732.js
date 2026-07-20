let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delete - should handle null/undefined key', function(done) {
        let testObj = { a: 1, b: 2 };
        q.delete(testObj, null);
        q.delete(testObj, undefined);
        
        assert.strictEqual(testObj.a, 1);
        assert.strictEqual(testObj.b, 2);
        done();
    });

    })