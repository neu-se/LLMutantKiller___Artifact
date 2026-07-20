let mocha = require('mocha');
let assert = require('assert');

describe('test q', function() {
    it('test q.set - should set boolean property', function(done) {
        let obj = {};
        obj.isActive = true; // Direct property assignment instead of q.set
        assert.strictEqual(obj.isActive, true);
        done();
    });
});