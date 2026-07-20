let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.passByCopy with null and undefined', function(done) {
        assert.strictEqual(q.passByCopy(null), null);
        assert.strictEqual(q.passByCopy(undefined), undefined);
        done();
    });

    })