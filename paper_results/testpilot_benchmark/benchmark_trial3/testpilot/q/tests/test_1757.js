let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.post with method that modifies object state', function(done) {
        let testObject = {
            value: 0,
            increment: function(amount) {
                this.value += amount;
                return this.value;
            }
        };
        
        let promise = q.post(testObject, 'increment', [10]);
        
        promise.then(function(result) {
            assert.equal(result, 10);
            assert.equal(testObject.value, 10);
            done();
        }).catch(done);
    });
});