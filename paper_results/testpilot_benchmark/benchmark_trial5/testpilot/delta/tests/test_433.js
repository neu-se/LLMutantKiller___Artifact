let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.map with retain operations', function(done) {
        let delta = new quill_delta([
            { retain: 5 },
            { insert: 'new text' },
            { retain: 3 }
        ]);
        
        let mapped = delta.map(function(op) {
            if (op.retain) {
                return { retain: op.retain * 2 };
            }
            return op;
        });
        
        assert.deepEqual(mapped.ops, [
            { retain: 10 },
            { insert: 'new text' },
            { retain: 6 }
        ]);
        done();
    });
});