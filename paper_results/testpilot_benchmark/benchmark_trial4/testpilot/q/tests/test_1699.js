let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should handle null and undefined values', function(done) {
        let obj = {};
        q.set(obj, 'nullValue', null);
        q.set(obj, 'undefinedValue', undefined);
        assert.strictEqual(obj.nullValue, null);
        assert.strictEqual(obj.undefinedValue, undefined);
        done();
    });

    })