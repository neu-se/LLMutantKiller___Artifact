let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat with non-empty deltas', function(done) {
        const delta1 = new quill_delta([{insert: 'Hello'}]);
        const delta2 = new quill_delta([{insert: ' World'}, {insert: '!'}]);
        
        const result = delta1.concat(delta2);
        
        assert.deepEqual(result.ops, [{insert: 'Hello'}, {insert: ' World'}, {insert: '!'}]);
        assert.notStrictEqual(result, delta1); // Should return new instance
        assert.notStrictEqual(result, delta2); // Should return new instance
        done();
    });

    })