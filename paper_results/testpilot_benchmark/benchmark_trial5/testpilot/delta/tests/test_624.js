let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine - multiple consecutive newlines', function(done) {
        let delta = new Delta([
            { insert: 'Line 1' },
            { insert: '\n' },
            { insert: '\n' },
            { insert: 'Line 3' },
            { insert: '\n' }
        ]);
        
        let lines = [];
        delta.eachLine((line, attributes, i) => {
            lines.push({ line, attributes, index: i });
        });
        
        assert.equal(lines.length, 3);
        assert.deepEqual(lines[0].line.ops, [{ insert: 'Line 1' }]);
        assert.deepEqual(lines[1].line.ops, []);
        assert.deepEqual(lines[2].line.ops, [{ insert: 'Line 3' }]);
        done();
    });
});