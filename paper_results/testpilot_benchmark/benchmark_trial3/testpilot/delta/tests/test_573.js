let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat with multiple operations', function(done) {
        let delta1 = new quill_delta([
            {insert: 'Hello'},
            {insert: ' ', attributes: {bold: true}}
        ]);
        let delta2 = new quill_delta([
            {insert: 'World'},
            {delete: 5}
        ]);
        let result = delta1.concat(delta2);
        
        assert.strictEqual(result.ops.length, 4);
        assert.strictEqual(result.ops[0].insert, 'Hello');
        assert.deepStrictEqual(result.ops[1], {insert: ' ', attributes: {bold: true}});
        assert.strictEqual(result.ops[2].insert, 'World');
        assert.strictEqual(result.ops[3].delete, 5);
        done();
    });
});