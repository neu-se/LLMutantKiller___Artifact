let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - insert before delete operation', function(done) {
        let delta = new quill_delta([{ delete: 5 }]);
        delta.push({ insert: 'hello' });
        assert.deepEqual(delta.ops, [{ insert: 'hello' }, { delete: 5 }]);
        done();
    });
});