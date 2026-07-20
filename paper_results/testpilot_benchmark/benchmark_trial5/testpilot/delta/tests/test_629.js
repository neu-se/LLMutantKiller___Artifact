let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine with early termination', function(done) {
        let delta = new quill_delta([
            { insert: 'Line 1\nLine 2\nLine 3\nLine 4' }
        ]);
        
        let processedLines = [];
        
        delta.eachLine((line, attrs, i) => {
            processedLines.push(line.ops[0].insert);
            if (i === 1) {
                return false; // Stop processing
            }
        });
        
        assert.equal(processedLines.length, 2);
        assert.equal(processedLines[0], 'Line 1');
        assert.equal(processedLines[1], 'Line 2');
        done();
    });

    })