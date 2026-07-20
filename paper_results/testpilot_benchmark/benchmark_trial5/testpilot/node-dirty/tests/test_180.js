let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('args-test', function() {
        // Test logic goes here
        // You can use the values 'hello', 42, { key: 'value' } in your test
        let testString = 'hello';
        let testNumber = 42;
        let testObject = { key: 'value' };
        
        // Add your assertions here, for example:
        assert.strictEqual(testString, 'hello');
        assert.strictEqual(testNumber, 42);
        assert.deepStrictEqual(testObject, { key: 'value' });
    });
});