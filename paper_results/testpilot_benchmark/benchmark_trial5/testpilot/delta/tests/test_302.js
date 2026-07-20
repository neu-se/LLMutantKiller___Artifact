let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.delete - chaining with other operations', function(done) {
        let delta = new quill_delta();
        delta.insert('hello').delete(5).retain(10);
        
        assert.strictEqual(delta.ops.length, 3, 'should have three operations');
        assert.strictEqual(delta.ops[0].insert, 'hello', 'first operation should be insert');
        assert.strictEqual(delta.ops[1].delete, 5, 'second operation should be delete');
        assert.strictEqual(delta.ops[2].retain, 10, 'third operation should be retain');
        done();
    });
});