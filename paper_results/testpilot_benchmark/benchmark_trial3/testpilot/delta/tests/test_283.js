let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.insert chaining multiple inserts', function(done) {
        let delta = new quill_delta();
        let result = delta
            .insert('Hello ')
            .insert('World', { bold: true })
            .insert('!');
        
        assert.strictEqual(result.ops.length, 3);
        assert.strictEqual(result.ops[0].insert, 'Hello ');
        assert.strictEqual(result.ops[1].insert, 'World');
        assert.deepStrictEqual(result.ops[1].attributes, { bold: true });
        assert.strictEqual(result.ops[2].insert, '!');
        done();
    });
});