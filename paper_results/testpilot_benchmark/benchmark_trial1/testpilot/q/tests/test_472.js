let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should set numeric property', function(done) {
        let obj = {};
        q.set(obj, 'count', 42);
        assert.strictEqual(obj.count, 42);
        done();
    });

    })