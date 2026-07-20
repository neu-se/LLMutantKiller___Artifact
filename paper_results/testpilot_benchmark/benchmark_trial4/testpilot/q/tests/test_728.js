let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke - method with no parameters', function(done) {
        let testObj = {
            getValue: function() {
                return 42;
            }
        };
        
        let promise = q.makePromise(testObj);
        
        promise.invoke('getValue')
            .then(function(result) {
                assert.strictEqual(result, 42);
                done();
            })
            .catch(done);
    });
});