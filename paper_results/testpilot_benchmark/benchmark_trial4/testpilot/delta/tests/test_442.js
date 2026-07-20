let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.partition with insert operations', function(done) {
        const delta = new quill_delta([
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World', attributes: { bold: true } }
        ]);
        
        const [withAttributes, withoutAttributes] = delta.partition(op => op.attributes);
        
        assert.equal(withAttributes.length, 1);
        assert.equal(withoutAttributes.length, 2);
        assert.deepEqual(withAttributes[0], { insert: 'World', attributes: { bold: true } });
        assert.deepEqual(withoutAttributes[0], { insert: 'Hello' });
        assert.deepEqual(withoutAttributes[1], { insert: ' ' });
        done();
    });

    })