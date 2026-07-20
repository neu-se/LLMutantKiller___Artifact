let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should overwrite existing property', function(done) {
        let obj = { name: 'Old Name' };
        q.set(obj, 'name', 'New Name');
        assert.strictEqual(obj.name, 'New Name');
        done();
    });

    })