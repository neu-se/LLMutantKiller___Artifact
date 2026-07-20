let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.get', function(done) {
        // Test 1: Get value that exists
        let db = dirty();
        db.set('testKey', 'testValue');
        let result = db.get('testKey');
        assert.strictEqual(result, 'testValue', 'Should return the correct value for existing key');

        // Test 2: Get value that doesn't exist
        let nonExistentResult = db.get('nonExistentKey');
        assert.strictEqual(nonExistentResult, undefined, 'Should return undefined for non-existent key');

        // Test 3: Get value after setting multiple keys
        db.set('key1', 'value1');
        db.set('key2', 'value2');
        db.set('key3', 'value3');
        assert.strictEqual(db.get('key1'), 'value1', 'Should return correct value for key1');
        assert.strictEqual(db.get('key2'), 'value2', 'Should return correct value for key2');
        assert.strictEqual(db.get('key3'), 'value3', 'Should return correct value for key3');

        // Test 4: Get value after overwriting
        db.set('overwriteKey', 'originalValue');
        db.set('overwriteKey', 'newValue');
        assert.strictEqual(db.get('overwriteKey'), 'newValue', 'Should return the new value after overwriting');

        // Test 5: Get with different data types
        db.set('numberKey', 42);
        db.set('booleanKey', true);
        db.set('objectKey', { name: 'test', value: 123 });
        db.set('arrayKey', [1, 2, 3]);
        
        assert.strictEqual(db.get('numberKey'), 42, 'Should handle number values');
        assert.strictEqual(db.get('booleanKey'), true, 'Should handle boolean values');
        assert.deepStrictEqual(db.get('objectKey'), { name: 'test', value: 123 }, 'Should handle object values');
        assert.deepStrictEqual(db.get('arrayKey'), [1, 2, 3], 'Should handle array values');

        // Test 6: Get with null and undefined values
        db.set('nullKey', null);
        db.set('undefinedKey', undefined);
        assert.strictEqual(db.get('nullKey'), null, 'Should handle null values');
        assert.strictEqual(db.get('undefinedKey'), undefined, 'Should handle undefined values');

        done();
    });
});