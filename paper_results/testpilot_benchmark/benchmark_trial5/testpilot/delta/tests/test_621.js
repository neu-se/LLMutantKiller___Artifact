let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine - with attributes', function(done) {
        let delta = new Delta([
            { insert: 'Bold text', attributes: { bold: true } },
            { insert: '\n', attributes: { header: 1 } },
            { insert: 'Normal text' },
            { insert: '\n' }
        ]);
        
        let lines = [];
        delta.eachLine((line, attributes, i) => {
            lines.push({ line, attributes, index: i });
        });
        
        assert.equal(lines.length, 2);
        assert.deepEqual(lines[0].attributes, { header: 1 });
        assert.deepEqual(lines[1].attributes, {});
        done();
    });

    })