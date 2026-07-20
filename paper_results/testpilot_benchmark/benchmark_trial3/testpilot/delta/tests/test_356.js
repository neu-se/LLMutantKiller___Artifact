let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.chop - removes trailing retain without attributes', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello' },
            { retain: 5 }
        ]);
        
        delta.chop();
        
        assert.deepEqual(delta.ops, [{ insert: 'Hello' }]);
        done();
    });

    })