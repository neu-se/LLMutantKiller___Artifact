let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should set null value', function(done) {
        let obj = {};
        q.set(obj, 'nullValue', null);
        assert.strictEqual(obj.nullValue, null);
        done();
    });

    })