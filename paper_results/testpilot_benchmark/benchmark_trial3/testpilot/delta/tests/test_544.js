let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose - returns new delta instance', function(done) {
        let delta1 = new quill_delta([{insert: 'Hello'}]);
        let delta2 = new quill_delta([{retain: 5}, {insert: ' World'}]);
        let result = delta1.compose(delta2);
        
        assert.notStrictEqual(result, delta1);
        assert.notStrictEqual(result, delta2);
        assert(result instanceof quill_delta);
        done();
    });
});