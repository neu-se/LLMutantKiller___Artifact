let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - inspect state', function() {
        let value = 'test';
        let promise = q.fulfill(value);
        let inspection = promise.inspect();
        
        assert.strictEqual(inspection.state, 'fulfilled');
        assert.strictEqual(inspection.value, 'test');
    });
});