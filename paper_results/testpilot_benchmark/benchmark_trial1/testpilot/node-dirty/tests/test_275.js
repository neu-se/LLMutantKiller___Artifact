let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.size - empty database', function(done) {
        let db = dirty();
        assert.strictEqual(db.size(), 0);
        done();
    });

    })