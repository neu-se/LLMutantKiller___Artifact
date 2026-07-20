let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.tap - should call tap callback and pass through resolved value', function(done) {
        let tapCalled = false;
        let tapValue = null;
        
        q.resolve(42)
            .tap(function(value) {
                tapCalled = true;
                tapValue = value;
            })
            .then(function(result) {
                assert.strictEqual(tapCalled, true, 'tap callback should be called');
                assert.strictEqual(tapValue, 42, 'tap should receive the resolved value');
                assert.strictEqual(result, 42, 'tap should pass through the original value');
                done();
            })
            .catch(done);
    });
});