let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should set boolean property', function(done) {
        let obj = {};
        q.set(obj, 'isActive', true);
        assert.strictEqual(obj.isActive, true);
        done();
    });

    })