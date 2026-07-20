let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine with mixed operations', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello\n' },
            { retain: 5 },
            { insert: 'World\n' }
        ]);
        
        let lines = [];
        
        delta.eachLine((line, attrs, i) => {
            if (line.ops[0] && line.ops[0].insert) {
                lines.push(line.ops[0].insert);
            }
        });
        
        assert.equal(lines.length, 1);
        assert.equal(lines[0], 'Hello');
        done();
    });
});