let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator with different operation types', function(done) {
        let ops = [
            { insert: 'Hello' },
            { retain: 10 },
            { delete: 5 },
            { insert: '\n', attributes: { header: 1 } }
        ];
        let iterator = new quill_delta.OpIterator(ops);
        
        // Test insert operation
        let insertOp = iterator.next();
        assert.strictEqual(insertOp.insert, 'Hello');
        
        // Test retain operation
        let retainOp = iterator.next();
        assert.strictEqual(retainOp.retain, 10);
        
        // Test delete operation
        let deleteOp = iterator.next();
        assert.strictEqual(deleteOp.delete, 5);
        
        // Test insert with attributes
        let insertWithAttrs = iterator.next();
        assert.strictEqual(insertWithAttrs.insert, '\n');
        assert.deepStrictEqual(insertWithAttrs.attributes, { header: 1 });
        
        assert.strictEqual(iterator.hasNext(), false);
        
        done();
    });

    })