let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine - with line attributes', function(done) {
        let delta = new Delta([
            { insert: 'Header' },
            { insert: '\n', attributes: { header: 1 } },
            { insert: 'Normal text' },
            { insert: '\n' }
        ]);
        
        let lines = [];
        delta.eachLine((line, attributes, i) => {
            lines.push({ content: line.ops[0].insert, attrs: attributes });
        });
        
        assert.equal(lines.length, 2);
        assert.equal(lines[0].content, 'Header');
        assert.deepEqual(lines[0].attrs, { header: 1 });
        assert.equal(lines[1].content, 'Normal text');
        assert.deepEqual(lines[1].attrs, {});
        done();
    });
});