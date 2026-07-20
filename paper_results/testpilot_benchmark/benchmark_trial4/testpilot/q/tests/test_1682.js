let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with simple object property', function(done) {
        let obj = { name: 'John', age: 30 };
        
        q.get(obj, 'name')
            .then(function(result) {
                assert.strictEqual(result, 'John');
                done();
            })
            .catch(done);
    });
});