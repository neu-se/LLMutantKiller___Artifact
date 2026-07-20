let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transform with insert operations', function(done) {
        let delta1 = new Delta().insert('Hello');
        let delta2 = new Delta().insert('World');
        
        let transformed = delta1.transform(delta2, false);
        
        assert(transformed instanceof Delta);
        assert.equal(transformed.ops.length, 1);
        assert.equal(transformed.ops[0].insert, 'World');
        assert.equal(transformed.ops[0].retain, undefined);
        done();
    });
});