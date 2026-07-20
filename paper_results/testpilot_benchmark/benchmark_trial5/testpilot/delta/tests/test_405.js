let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.forEach predicate context', function(done) {
        let delta = new quill_delta([
            { insert: 'A' },
            { insert: 'B' }
        ]);
        
        let contextObj = { counter: 0 };
        
        // Test that forEach preserves context when using arrow function
        delta.forEach((op, index) => {
            contextObj.counter++;
        });
        
        assert.equal(contextObj.counter, 2);
        done();
    });
});