let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine with empty lines', function(done) {
        let delta = new quill_delta([
            { insert: 'First\n\nThird\n' }
        ]);
        
        let lines = [];
        
        delta.eachLine((line, attrs, i) => {
            lines.push(line.ops.length > 0 ? line.ops[0].insert : '');
        });
        
        assert.equal(lines.length, 3);
        assert.equal(lines[0], 'First');
        assert.equal(lines[1], '');
        assert.equal(lines[2], 'Third');
        done();
    });
});