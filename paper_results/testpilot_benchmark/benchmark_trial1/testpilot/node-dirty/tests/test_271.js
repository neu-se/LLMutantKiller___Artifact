let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.get', function(done) {
        // Test 1: Get value that exists
        let db = dirty();
        db.set('testKey', 'testValue');
        let result = db.get('testKey');
        assert.strictEqual(result, 'testValue');

        // Test 2: Get value that doesn't exist
        let nonExistentResult = db.get('nonExistentKey');
        assert.strictEqual(nonExistentResult, undefined);

        // Test 3: Get value after setting multiple keys
        db.set('key1', 'value1');
        db.set('key2', 'value2');
        db.set('key3', 'value3');
        assert.strictEqual(db.get('key1'), 'value1');
        assert.strictEqual(db.get('key2'), 'value2');
        assert.strictEqual(db.get('key3'), 'value3');

        // Test 4: Get value with different data types
        db.set('stringKey', 'string value');
        db.set('numberKey', 42);
        db.set('objectKey', { name: 'test', value: 123 });
        db.set('arrayKey', [1, 2, 3]);
        db.set('booleanKey', true);
        
        assert.strictEqual(db.get('stringKey'), 'string value');
        assert.strictEqual(db.get('numberKey'), 42);
        assert.deepStrictEqual(db.get('objectKey'), { name: 'test', value: 123 });
        assert.deepStrictEqual(db.get('arrayKey'), [1, 2, 3]);
        assert.strictEqual(db.get('booleanKey'), true);

        // Test 5: Get value after overwriting
        db.set('overwriteKey', 'original');
        assert.strictEqual(db.get('overwriteKey'), 'original');
        db.set('overwriteKey', 'updated');
        assert.strictEqual(db.get('overwriteKey'), 'updated');

        // Test 6: Get with null and undefined keys
        db.set(null, 'null key value');
        db.set(undefined, 'undefined key value');
        assert.strictEqual(db.get(null), 'null key value');
        assert.strictEqual(db.get(undefined), 'undefined key value');

        done();
    });
});