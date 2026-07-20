let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should set undefined value', function(done) {
        let obj = {};
        q.set(obj, 'undefinedValue', undefined);
        assert.strictEqual(obj.undefinedValue, undefined);
        done();
    });

    })