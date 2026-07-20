let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.reduce with string concatenation', function(done) {
        // Create a delta with multiple insert operations
        let delta = new quill_delta([
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World' }
        ]);
        
        // Test reduce to concatenate all insert text
        let concatenated = delta.reduce((acc, op) => {
            if (op.insert && typeof op.insert === 'string') {
                return acc + op.insert;
            }
            return acc;
        }, '');
        
        assert.strictEqual(concatenated, 'Hello World');
        done();
    });

    })