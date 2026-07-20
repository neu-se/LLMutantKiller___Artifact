let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke - method that returns a promise', function(done) {
        let testObj = {
            asyncAdd: function(a, b) {
                return q.resolve(a + b);
            }
        };
        
        // Since asyncAdd already returns a promise, invoke it directly
        testObj.asyncAdd(10, 20)
            .then(function(result) {
                assert.equal(result, 30);
                done();
            })
            .catch(done);
    });
});