let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.reduce with insert text concatenation', function(done) {
        // Create a delta with insert operations
        let delta = new quill_delta([
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World' }
        ]);
        
        // Test reduce to concatenate all insert text
        let text = delta.reduce((acc, op) => {
            return acc + (op.insert || '');
        }, '');
        
        assert.strictEqual(text, 'Hello World');
        done();
    });

    })