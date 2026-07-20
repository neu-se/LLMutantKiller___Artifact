let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.partition where all operations pass', function(done) {
        const delta = new quill_delta([
            { insert: 'A' },
            { insert: 'B' },
            { insert: 'C' }
        ]);
        
        const [passed, failed] = delta.partition(op => op.insert);
        
        assert.equal(passed.length, 3);
        assert.equal(failed.length, 0);
        assert.deepEqual(passed, [
            { insert: 'A' },
            { insert: 'B' },
            { insert: 'C' }
        ]);
        done();
    });

    })