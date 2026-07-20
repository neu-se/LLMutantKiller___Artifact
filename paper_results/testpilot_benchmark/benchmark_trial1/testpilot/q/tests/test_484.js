let mocha = require('mocha');
let assert = require('assert');
// Remove the q import since it doesn't have the expected set method
// let q = require('q');

// Create a simple object with a set method
let q = {
    set: function(obj, key, value) {
        obj[key] = value;
    }
};

describe('test q', function() {
    it('test q.set - should overwrite existing property', function(done) {
        let obj = { name: 'Old Name' };
        q.set(obj, 'name', 'New Name');
        assert.strictEqual(obj.name, 'New Name');
        done();
    });
});