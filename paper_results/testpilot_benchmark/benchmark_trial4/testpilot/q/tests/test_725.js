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
        
        let promise = q.makePromise(testObj);
        
        promise.invoke('asyncAdd', 10, 20)
            .then(function(result) {
                assert.strictEqual(result, 30);
                done();
            })
            .catch(done);
    });

    })