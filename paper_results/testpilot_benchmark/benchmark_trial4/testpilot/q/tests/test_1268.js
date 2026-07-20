let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.nodeify', function() {
        
        it('should work with promises that resolve with complex objects', function(done) {
            let testObject = { foo: 'bar', nested: { value: 42 } };
            let promise = q.resolve(testObject);
            
            promise.nodeify(function(error, value) {
                assert.strictEqual(error, null);
                assert.deepStrictEqual(value, testObject);
                done();
            });
        });
    });
});