let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat with non-empty and empty delta', function(done) {
        let delta1 = new quill_delta([{insert: 'Hello'}]);
        let delta2 = new quill_delta();
        let result = delta1.concat(delta2);
        
        assert.strictEqual(result.ops.length, 1);
        assert.strictEqual(result.ops[0].insert, 'Hello');
        done();
    });

    })