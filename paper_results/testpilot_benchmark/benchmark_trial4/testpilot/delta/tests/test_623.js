let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine - single line without newline', function(done) {
        let delta = new Delta([
            { insert: 'Single line without newline' }
        ]);
        
        let lines = [];
        delta.eachLine((line, attributes, i) => {
            lines.push(line.ops[0].insert);
        });
        
        assert.equal(lines.length, 1);
        assert.equal(lines[0], 'Single line without newline');
        done();
    });
});