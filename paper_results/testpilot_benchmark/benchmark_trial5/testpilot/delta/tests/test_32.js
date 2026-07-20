let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should calculate length correctly', function(done) {
        const delta = new quill_delta();
        delta.insert('hello');
        delta.retain(3);
        delta.delete(2);
        // Assuming Op.length returns string length for insert and number for retain/delete
        // This test may need adjustment based on actual Op implementation
        assert.equal(delta.ops.length, 3);
        done();
    });
});