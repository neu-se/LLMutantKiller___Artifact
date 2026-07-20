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
        assert.equal(retainOps.length, 2);
        assert.equal(retainOps[0].retain, 5);
        assert.equal(retainOps[1].retain, 3);
        
        // Test 2: Filter operations by type (insert)
        let insertOps = delta1.filter(op => op.insert !== undefined);
        assert.equal(insertOps.length, 1);
        assert.equal(insertOps[0].insert, 'hello');
        
        // Test 3: Filter operations by type (delete)
        let deleteOps = delta1.filter(op => op.delete !== undefined);
        assert.equal(deleteOps.length, 1);
        assert.equal(deleteOps[0].delete, 2);
        
        // Test 4: Filter with no matches
        let noMatches = delta1.filter(op => op.nonexistent !== undefined);
        assert.equal(noMatches.length, 0);
        
        // Test 5: Filter all operations (should return all)
        let allOps = delta1.filter(op => true);
        assert.equal(allOps.length, 4);
        
        // Test 6: Filter with empty delta
        let emptyDelta = new quill_delta([]);
        let emptyResult = emptyDelta.filter(op => op.insert !== undefined);
        assert.equal(emptyResult.length, 0);
        
        // Test 7: Filter by attribute presence
        let delta2 = new quill_delta([
            { insert: 'hello', attributes: { bold: true } },
            { insert: 'world' },
            { insert: 'test', attributes: { italic: true } }
        ]);
        
        let withAttributes = delta2.filter(op => op.attributes !== undefined);
        assert.equal(withAttributes.length, 2);
        assert.equal(withAttributes[0].insert, 'hello');
        assert.equal(withAttributes[1].insert, 'test');
        
        done();
    });
});