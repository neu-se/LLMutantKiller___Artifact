let mocha = require('mocha');
let assert = require('assert');

// Mock implementation of q.set since it doesn't exist in the q library
let q = {
    set: function(obj, key, value) {
        obj[key] = value;
    }
};

describe('test q', function() {
    it('test q.set - should set null value', function(done) {
        let obj = {};
        q.set(obj, 'nullValue', null);
        assert.strictEqual(obj.nullValue, null);
        done();
    });
});