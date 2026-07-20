let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.dispatch - method returning promise', function(done) {
        let testObject = {
            asyncMethod: function(value) {
                return q.resolve(value * 2);
            }
        };
        
        let promise = q.makePromise(testObject);
        let result = promise.dispatch('asyncMethod', [5]);
        
        result.then(function(value) {
            assert.equal(value, 10);
            done();
        }).catch(done);
    });
});