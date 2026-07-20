let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with simple object property', function(done) {
        let obj = { name: 'John', age: 30 };
        let result = q.get(obj, 'name');
        
        result.then(function(value) {
            assert.strictEqual(value, 'John');
            done();
        }).catch(done);
    });
});