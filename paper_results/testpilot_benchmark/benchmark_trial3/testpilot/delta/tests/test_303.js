let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.retain - retain with attributes', function(done) {
        let delta = new quill_delta();
        let attributes = { bold: true, italic: true };
        let result = delta.retain(3, attributes);
        
        assert.strictEqual(result, delta, 'retain should return the delta instance for chaining');
        assert.strictEqual(delta.ops.length, 1, 'should have one operation');
        assert.strictEqual(delta.ops[0].retain, 3, 'should retain 3 characters');
        assert.deepStrictEqual(delta.ops[0].attributes, attributes, 'should have the specified attributes');
        done();
    });

    })