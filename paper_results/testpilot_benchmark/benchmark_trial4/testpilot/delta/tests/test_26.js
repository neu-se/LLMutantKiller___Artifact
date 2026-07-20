let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should map operations', function(done) {
        let delta = new quill_delta([
            { insert: 'hello' },
            { insert: 'world' }
        ]);
        let mapped = delta.map(op => op.insert);
        assert.deepEqual(mapped, ['hello', 'world']);
        done();
    });

    })