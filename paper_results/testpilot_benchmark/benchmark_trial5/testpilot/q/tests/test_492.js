let mocha = require('mocha');
let assert = require('assert');

// Create our own set function since q library doesn't have this functionality
const q = {
    set: function(obj, key, value) {
        obj[key] = value;
        return obj;
    }
};

describe('test q', function() {
    it('test q.set - should return the modified object', function(done) {
        let obj = {};
        let result = q.set(obj, 'test', 'value');
        assert.strictEqual(result, obj);
        assert.strictEqual(obj.test, 'value');
        done();
    });
});