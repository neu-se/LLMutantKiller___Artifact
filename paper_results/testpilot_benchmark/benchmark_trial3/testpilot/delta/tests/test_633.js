let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine with custom newline character', function(done) {
        let delta = new quill_delta([
            { insert: 'First|Second|Third' }
        ]);
        
        let lines = [];
        
        delta.eachLine((line, attrs, i) => {
            lines.push(line.ops[0].insert);
        }, '|');
        
        assert.equal(lines.length, 3);
        assert.equal(lines[0], 'First');
        assert.equal(lines[1], 'Second');
        assert.equal(lines[2], 'Third');
        done();
    });
});