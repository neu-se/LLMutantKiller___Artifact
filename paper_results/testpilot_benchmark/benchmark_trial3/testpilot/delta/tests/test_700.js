let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transform with complex operations', function(done) {
        let delta1 = new Delta()
            .retain(2)
            .insert('Hello')
            .delete(3)
            .retain(1);
        
        let delta2 = new Delta()
            .retain(1)
            .insert('World')
            .retain(2)
            .delete(1);
        
        let transformed = delta1.transform(delta2, false);
        
        assert(transformed instanceof Delta);
        done();
    });
});