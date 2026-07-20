let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - inspect shows fulfilled state', function(done) {
        let testValue = { test: 'data' };
        let promise = q.fulfill(testValue);
        
        // Access the inspect function if available
        if (promise.inspect) {
            let inspection = promise.inspect();
            assert.strictEqual(inspection.state, 'fulfilled');
            assert.strictEqual(inspection.value, testValue);
        }
        done();
    });
});