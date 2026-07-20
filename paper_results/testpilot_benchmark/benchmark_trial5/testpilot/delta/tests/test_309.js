let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.retain - multiple retain operations', function(done) {
        let delta = new quill_delta();
        delta.retain(2).retain(3, { bold: true });
        
        assert.strictEqual(delta.ops.length, 2, 'should have two operations');
        assert.strictEqual(delta.ops[0].retain, 2, 'first operation should retain 2 characters');
        assert.strictEqual(delta.ops[0].attributes, undefined, 'first operation should have no attributes');
        assert.strictEqual(delta.ops[1].retain, 3, 'second operation should retain 3 characters');
        assert.deepStrictEqual(delta.ops[1].attributes, { bold: true }, 'second operation should have bold attribute');
        done();
    });

    })