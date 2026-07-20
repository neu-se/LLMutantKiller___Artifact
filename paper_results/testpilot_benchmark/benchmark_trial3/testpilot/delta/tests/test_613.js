let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine - custom newline character', function(done) {
        let delta = new Delta([
            { insert: 'First line' },
            { insert: '|' },
            { insert: 'Second line' },
            { insert: '|' }
        ]);
        
        let lines = [];
        delta.eachLine((line, attributes, i) => {
            lines.push({ line, attributes, index: i });
        }, '|');
        
        assert.equal(lines.length, 2);
        assert.deepEqual(lines[0].line.ops, [{ insert: 'First line' }]);
        assert.deepEqual(lines[1].line.ops, [{ insert: 'Second line' }]);
        done();
    });

    })