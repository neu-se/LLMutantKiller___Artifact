let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine with multiple lines', function(done) {
        let delta = new quill_delta([
            { insert: 'First line\nSecond line\nThird line' }
        ]);
        
        let lines = [];
        let indices = [];
        
        delta.eachLine((line, attrs, i) => {
            lines.push(line.ops[0].insert);
            indices.push(i);
        });
        
        assert.equal(lines.length, 3);
        assert.equal(lines[0], 'First line');
        assert.equal(lines[1], 'Second line');
        assert.equal(lines[2], 'Third line');
        assert.deepEqual(indices, [0, 1, 2]);
        done();
    });

    })