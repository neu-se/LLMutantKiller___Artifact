let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should transform delta against another', function(done) {
        let delta1 = new Delta([{ insert: 'A' }, { retain: 1 }, { insert: 'C' }]);
        let delta2 = new Delta([{ retain: 1 }, { insert: 'B' }]);
        let transformed = delta1.transform(delta2, true);
        assert.strictEqual(transformed.ops.length, 2);
        assert.strictEqual(transformed.ops[0].retain, 2);
        assert.strictEqual(transformed.ops[1].insert, 'B');
        done();
    });
});