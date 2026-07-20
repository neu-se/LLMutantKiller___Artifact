let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose - mixed operations', function(done) {
        const delta1 = new quill_delta([{insert: 'Hello'}, {insert: ' World', attributes: {bold: true}}]);
        const delta2 = new quill_delta([{retain: 6}, {delete: 5}, {insert: 'Test'}]);
        const result = delta1.compose(delta2);
        
        assert.deepEqual(result.ops, [{insert: 'Hello Test'}]);
        done();
    });

    })