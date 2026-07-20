let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose - complex mixed operations', function(done) {
        let delta1 = new quill_delta([
            { insert: 'The quick brown fox' }
        ]);
        let delta2 = new quill_delta([
            { retain: 4 },
            { delete: 6 },
            { insert: 'slow' },
            { retain: 9, attributes: { italic: true } }
        ]);
        
        let result = delta1.compose(delta2);
        let expected = new quill_delta([
            { insert: 'The ' },
            { insert: 'slow' },
            { insert: 'brown fox', attributes: { italic: true } }
        ]);
        
        assert.deepEqual(result.ops, expected.ops);
        done();
    });

    })