let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.filter', function(done) {
        // Test 1: Filter operations by type (retain)
        let delta1 = new quill_delta([
            { retain: 5 },
            { insert: 'hello' },
            { retain: 3 },
            { delete: 2 }
        ]);
        
        let retainOps = delta1.filter(op => op.retain !== undefined);
        assert.strictEqual(retainOps.length, 2);
        assert.strictEqual(retainOps[0].retain, 5);
        assert.strictEqual(retainOps[1].retain, 3);
        
        // Test 2: Filter operations by type (insert)
        let insertOps = delta1.filter(op => op.insert !== undefined);
        assert.strictEqual(insertOps.length, 1);
        assert.strictEqual(insertOps[0].insert, 'hello');
        
        // Test 3: Filter operations by type (delete)
        let deleteOps = delta1.filter(op => op.delete !== undefined);
        assert.strictEqual(deleteOps.length, 1);
        assert.strictEqual(deleteOps[0].delete, 2);
        
        // Test 4: Filter with no matches
        let noMatches = delta1.filter(op => op.nonexistent !== undefined);
        assert.strictEqual(noMatches.length, 0);
        assert.deepStrictEqual(noMatches, []);
        
        // Test 5: Filter on empty delta
        let emptyDelta = new quill_delta([]);
        let emptyResult = emptyDelta.filter(op => true);
        assert.strictEqual(emptyResult.length, 0);
        assert.deepStrictEqual(emptyResult, []);
        
        // Test 6: Filter with complex predicate (operations with attributes)
        let delta2 = new quill_delta([
            { insert: 'bold text', attributes: { bold: true } },
            { insert: 'normal text' },
            { insert: 'italic text', attributes: { italic: true } }
        ]);
        
        let opsWithAttributes = delta2.filter(op => op.attributes !== undefined);
        assert.strictEqual(opsWithAttributes.length, 2);
        assert.strictEqual(opsWithAttributes[0].insert, 'bold text');
        assert.strictEqual(opsWithAttributes[1].insert, 'italic text');
        
        // Test 7: Filter returns array (not Delta object)
        let result = delta1.filter(op => op.retain !== undefined);
        assert.strictEqual(Array.isArray(result), true);
        assert.strictEqual(result instanceof quill_delta, false);
        
        done();
    });
});