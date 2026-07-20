let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should set nested property path', function(done) {
        let obj = {};
        q.set(obj, 'user.profile.name', 'Alice');
        assert.strictEqual(obj.user.profile.name, 'Alice');
        done();
    });

    })