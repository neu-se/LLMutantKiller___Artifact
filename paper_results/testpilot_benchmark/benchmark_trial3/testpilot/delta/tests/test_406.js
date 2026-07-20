let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.forEach callback context', function(done) {
        let delta = new quill_delta([
            { insert: 'Test' },
            { retain: 2 }
        ]);
        
        let context = { counter: 0 };
        delta.forEach(function(op, index) {
            this.counter++;
            assert.equal(typeof op, 'object');
            assert.equal(typeof index, 'number');
        }, context);
        
        assert.equal(context.counter, 2);
        done();
    });
});