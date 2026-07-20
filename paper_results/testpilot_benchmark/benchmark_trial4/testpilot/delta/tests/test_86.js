let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test peek and peekLength methods', function(done) {
        const ops = [
            { insert: 'Hello' },
            { retain: 5 }
        ];
        const iterator = new quill_delta.OpIterator(ops);
        
        assert.deepStrictEqual(iterator.peek(), { insert: 'Hello' });
        assert.strictEqual(iterator.peekLength(), 5);
        
        // Advance partially
        iterator.next(2);
        assert.deepStrictEqual(iterator.peek(), { insert: 'Hello' });
        assert.strictEqual(iterator.peekLength(), 3);
        
        // Advance to next op
        iterator.next();
        assert.deepStrictEqual(iterator.peek(), { retain: 5 });
        assert.strictEqual(iterator.peekLength(), 5);
        
        // Advance past all ops
        iterator.next();
        assert.strictEqual(iterator.peek(), undefined);
        assert.strictEqual(iterator.peekLength(), Infinity);
        done();
    });

    })