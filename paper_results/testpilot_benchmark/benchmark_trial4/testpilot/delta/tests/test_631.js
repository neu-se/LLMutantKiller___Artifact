let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine with mixed operations', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello ' },
            { insert: 'World', attributes: { bold: true } },
            { insert: '\nNext line' }
        ]);
        
        let lines = [];
        
        delta.eachLine((line, attrs, i) => {
            lines.push(line);
        });
        
        assert.equal(lines.length, 2);
        assert.equal(lines[0].ops.length, 2);
        assert.equal(lines[0].ops[0].insert, 'Hello ');
        assert.equal(lines[0].ops[1].insert, 'World');
        assert.equal(lines[1].ops[0].insert, 'Next line');
        done();
    });
});