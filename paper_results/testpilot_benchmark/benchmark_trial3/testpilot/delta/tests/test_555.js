let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat with two non-empty deltas', function(done) {
        let delta1 = new quill_delta([{insert: 'Hello '}]);
        let delta2 = new quill_delta([{insert: 'World'}]);
        let result = delta1.concat(delta2);
        
        assert.strictEqual(result.ops.length, 2);
        assert.strictEqual(result.ops[0].insert, 'Hello ');
        assert.strictEqual(result.ops[1].insert, 'World');
        done();
    });

    })