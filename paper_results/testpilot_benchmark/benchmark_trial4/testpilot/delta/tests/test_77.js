let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator next() method', function(done) {
        let ops = [
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World', attributes: { bold: true } }
        ];
        let iterator = new quill_delta.OpIterator(ops);
        
        // Test first operation
        assert.strictEqual(iterator.hasNext(), true);
        let firstOp = iterator.next();
        assert.deepStrictEqual(firstOp, { insert: 'Hello' });
        
        // Test second operation
        assert.strictEqual(iterator.hasNext(), true);
        let secondOp = iterator.next();
        assert.deepStrictEqual(secondOp, { insert: ' ' });
        
        // Test third operation
        assert.strictEqual(iterator.hasNext(), true);
        let thirdOp = iterator.next();
        assert.deepStrictEqual(thirdOp, { insert: 'World', attributes: { bold: true } });
        
        // Test end of iteration
        assert.strictEqual(iterator.hasNext(), false);
        
        done();
    });

    })