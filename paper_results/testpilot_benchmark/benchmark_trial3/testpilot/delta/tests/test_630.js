let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine with empty delta', function(done) {
        let delta = new quill_delta([]);
        
        let callCount = 0;
        
        delta.eachLine((line, attrs, i) => {
            callCount++;
        });
        
        assert.equal(callCount, 0);
        done();
    });
});