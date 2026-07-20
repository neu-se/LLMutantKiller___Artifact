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
        
        q.post(testObject, 'increment', [5])
            .then(function(result) {
                assert.equal(result, 5);
                assert.equal(testObject.value, 5);
                done();
            })
            .catch(done);
    });
});