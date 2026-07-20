let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should partition operations', function(done) {
        const delta = new quill_delta([
            { insert: 'hello' },
            { delete: 3 },
            { insert: 'world' }
        ]);
        const [inserts, others] = delta.partition(op => op.insert);
        assert.deepEqual(inserts, [{ insert: 'hello' }, { insert: 'world' }]);
        assert.deepEqual(others, [{ delete: 3 }]);
        done();
    });
});