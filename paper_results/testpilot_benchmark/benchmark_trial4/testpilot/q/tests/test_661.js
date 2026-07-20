let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.get - should work with array indices', function(done) {
        let testArray = ['apple', 'banana', 'cherry'];
        let promise = q.resolve(testArray);
        
        promise.get(1).then(function(value) {
            assert.strictEqual(value, 'banana');
            done();
        }).catch(done);
    });
});