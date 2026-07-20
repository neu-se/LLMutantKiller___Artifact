let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.insert with text and attributes', function(done) {
        let delta = new quill_delta();
        let attributes = { bold: true, italic: true };
        let result = delta.insert('Formatted Text', attributes);
        
        assert.strictEqual(result.ops.length, 1);
        assert.strictEqual(result.ops[0].insert, 'Formatted Text');
        assert.deepStrictEqual(result.ops[0].attributes, attributes);
        done();
    });

    })