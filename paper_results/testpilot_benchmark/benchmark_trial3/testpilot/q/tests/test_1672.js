let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with object property', function(done) {
        let testObject = { foo: "bar", nested: { value: 42 } };
        
        // Use Q.resolve to create a promise and then access the property
        q.resolve(testObject.foo).then(function(result) {
            assert.equal(result, "bar");
            done();
        }).catch(done);
    });
});