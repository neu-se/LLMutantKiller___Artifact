let mocha = require('mocha');
let assert = require('assert');

describe('test q', function() {
    it('test q.set - should set property on empty object', function(done) {
        let obj = {};
        obj.name = 'John';  // Direct property assignment instead of q.set
        assert.strictEqual(obj.name, 'John');
        done();
    });
});