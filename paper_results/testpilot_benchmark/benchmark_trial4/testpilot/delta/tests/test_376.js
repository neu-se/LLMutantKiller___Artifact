let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.chop - returns new delta instance', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello' },
            { retain: 5 }
        ]);
        
        let chopped = delta.chop();
        
        assert.notStrictEqual(delta, chopped);
        assert.ok(chopped instanceof quill_delta);
        done();
    });
});