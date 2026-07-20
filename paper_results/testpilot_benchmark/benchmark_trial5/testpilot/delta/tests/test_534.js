let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose - complex operations', function(done) {
        let delta1 = new quill_delta([{insert: 'The quick brown fox'}]);
        let delta2 = new quill_delta([
            {retain: 4},
            {delete: 5},
            {insert: 'slow'},
            {retain: 10}
        ]);
        let result = delta1.compose(delta2);
        
        assert.deepEqual(result.ops, [{insert: 'The slow brown fox'}]);
        done();
    });

    })