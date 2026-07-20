let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine - basic functionality', function(done) {
        let delta = new Delta([
            { insert: 'Hello' },
            { insert: '\n' },
            { insert: 'World' },
            { insert: '\n' }
        ]);
        
        let lines = [];
        delta.eachLine((line, attributes, i) => {
            lines.push({ line, attributes, index: i });
        });
        
        assert.equal(lines.length, 2);
        assert.deepEqual(lines[0].line.ops, [{ insert: 'Hello' }]);
        assert.deepEqual(lines[1].line.ops, [{ insert: 'World' }]);
        assert.equal(lines[0].index, 0);
        assert.equal(lines[1].index, 1);
        done();
    });

    })