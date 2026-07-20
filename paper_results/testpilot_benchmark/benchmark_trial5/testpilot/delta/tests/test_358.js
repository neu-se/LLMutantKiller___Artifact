let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.chop - keeps insert operations at end', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello' },
            { insert: ' World' }
        ]);
        
        let chopped = delta.chop();
        
        assert.deepEqual(chopped.ops, [
            { insert: 'Hello' },
            { insert: ' World' }
        ]);
        done();
    });

    })