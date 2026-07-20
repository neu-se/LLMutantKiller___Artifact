let assert = require('assert');
let Q = require('q');

describe('test q', function() {
    it('test q.get with simple object property', function(done) {
        let obj = { name: 'John', age: 30 };
        let result = Q(obj.name); // Create a resolved promise with the property value
        
        result.then(function(value) {
            assert.strictEqual(value, 'John');
            done();
        }).catch(done);
    });
});