let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine with early termination', function(done) {
        let delta = new quill_delta([
            { insert: 'First line\nSecond line\nThird line\n' }
        ]);
        
        let processedLines = 0;
        
        delta.eachLine((line, attrs, i) => {
            processedLines++;
            if (i === 1) {
                return false; // Stop processing
            }
        });
        
        assert.equal(processedLines, 2);
        done();
    });
});