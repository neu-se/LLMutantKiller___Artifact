let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.chop - keeps non-retain operations', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello' },
            { delete: 3 }
        ]);
        
        delta.chop();
        
        assert.deepEqual(delta.ops, [
            { insert: 'Hello' },
            { delete: 3 }
        ]);
        done();
    });

    })