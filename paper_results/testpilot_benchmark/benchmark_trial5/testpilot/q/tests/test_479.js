let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should handle array indices', function(done) {
        let obj = { items: [] };
        q.set(obj, 'items[0]', 'first');
        assert.strictEqual(obj.items[0], 'first');
        done();
    });

    })