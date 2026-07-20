let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.get - should get property from resolved object', function(done) {
        let testObj = { name: 'John', age: 30, city: 'New York' };
        let promise = q.resolve(testObj);
        
        promise.get('name').then(function(value) {
            assert.strictEqual(value, 'John');
            done();
        }).catch(done);
    });
});