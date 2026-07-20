let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.chop - removes multiple trailing non-insert operations', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello' },
            { retain: 3 },
            { delete: 2 },
            { retain: 1 }
        ]);
        
        let chopped = delta.chop();
        
        assert.deepEqual(chopped.ops, [{ insert: 'Hello' }]);
        done();
    });

    })