let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.get', function(done) {
        // Test 1: Get existing key
        let db = dirty();
        db.set('testKey', 'testValue');
        let result = db.get('testKey');
        assert.strictEqual(result, 'testValue', 'Should return the correct value for existing key');

        // Test 2: Get non-existing key
        let nonExistentResult = db.get('nonExistentKey');
        assert.strictEqual(nonExistentResult, undefined, 'Should return undefined for non-existing key');

        // Test 3: Get with different data types
        db.set('numberKey', 42);
        db.set('objectKey', { name: 'test', value: 123 });
        db.set('arrayKey', [1, 2, 3]);
        db.set('booleanKey', true);
        db.set('nullKey', null);

        assert.strictEqual(db.get('numberKey'), 42, 'Should return number value');
        assert.deepStrictEqual(db.get('objectKey'), { name: 'test', value: 123 }, 'Should return object value');
        assert.deepStrictEqual(db.get('arrayKey'), [1, 2, 3], 'Should return array value');
        assert.strictEqual(db.get('booleanKey'), true, 'Should return boolean value');
        assert.strictEqual(db.get('nullKey'), null, 'Should return null value');

        // Test 4: Get after updating a key
        db.set('updateKey', 'originalValue');
        db.set('updateKey', 'updatedValue');
        assert.strictEqual(db.get('updateKey'), 'updatedValue', 'Should return updated value');

        // Test 5: Get with empty string key
        db.set('', 'emptyStringKey');
        assert.strictEqual(db.get(''), 'emptyStringKey', 'Should handle empty string as key');

        done();
    });
});