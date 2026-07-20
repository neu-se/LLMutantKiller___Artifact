let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.rest - iterator at end', function(done) {
        let ops = [
            { insert: 'Hello' },
            { insert: ' World' }
        ];
        let delta = new quill_delta(ops);
        let iterator = new quill_delta.OpIterator(delta.ops);
        
        // Consume all operations
        iterator.next(5); // "Hello"
        iterator.next(6); // " World"
        
        let rest = iterator.rest();
        assert.deepEqual(rest, []);
        done();
    });

    })