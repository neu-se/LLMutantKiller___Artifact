let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.tap - should call tap callback and pass through value', function(done) {
        let tapCalled = false;
        let tapValue = null;
        
        q.resolve(42)
            .tap(function(value) {
                tapCalled = true;
                tapValue = value;
            })
            .then(function(value) {
                assert.strictEqual(tapCalled, true, 'tap callback should have been called');
                assert.strictEqual(tapValue, 42, 'tap callback should receive the value');
                assert.strictEqual(value, 42, 'original value should pass through');
                done();
            })
            .catch(done);
    });
});