let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.get - should return undefined for non-existent property', function(done) {
        let testObj = { name: 'John' };
        let promise = q.resolve(testObj);
        
        promise.get('nonExistent').then(function(value) {
            assert.strictEqual(value, undefined);
            done();
        }).catch(done);
    });
});