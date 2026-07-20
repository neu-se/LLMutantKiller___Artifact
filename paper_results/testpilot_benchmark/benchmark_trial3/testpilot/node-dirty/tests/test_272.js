let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.get - should return undefined for non-existent key', function(done) {
        let db = new dirty();
        db.on('load', function() {
            let result = db.get('nonexistent');
            assert.strictEqual(result, undefined);
            done();
        });
    });

    })