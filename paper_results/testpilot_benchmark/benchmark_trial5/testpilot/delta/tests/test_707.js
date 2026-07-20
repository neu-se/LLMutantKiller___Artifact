let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transform with retain and insert', function(done) {
        let delta1 = new Delta().retain(3).insert('ABC');
        let delta2 = new Delta().retain(1).insert('XYZ');
        
        let transformed = delta1.transform(delta2, false);
        
        assert(transformed instanceof Delta);
        assert(transformed.ops.length > 0);
        done();
    });
});