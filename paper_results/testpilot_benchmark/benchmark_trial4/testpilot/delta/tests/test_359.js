let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.chop - removes trailing delete operation', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello' },
            { delete: 3 }
        ]);
        
        let chopped = delta.chop();
        
        assert.deepEqual(chopped.ops, [{ insert: 'Hello' }]);
        done();
    });

    })