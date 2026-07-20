let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nearer with nested fulfilled promise value', function(done) {
        // Create a promise that resolves to an object
        let complexValue = { name: "test", data: [1, 2, 3] };
        let fulfilledPromise = q.resolve(complexValue);
        
        // q.nearer should return the resolved complex value
        let result = q.nearer(fulfilledPromise);
        assert.deepStrictEqual(result, complexValue);
        done();
    });
});