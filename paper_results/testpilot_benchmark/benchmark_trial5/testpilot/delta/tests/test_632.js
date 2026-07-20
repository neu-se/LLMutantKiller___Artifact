let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine with non-insert operations', function(done) {
        let delta = new quill_delta([
            { retain: 5 },
            { delete: 3 }
        ]);
        
        let lineCount = 0;
        
        delta.eachLine((line, attrs, i) => {
            lineCount++;
        });
        
        assert.equal(lineCount, 0);
        done();
    });
});