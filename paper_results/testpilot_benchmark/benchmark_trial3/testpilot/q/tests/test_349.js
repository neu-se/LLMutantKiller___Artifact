let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with basic descriptor', function(done) {
        let value = 42;
        let descriptor = {
            when: function() {
                return value;
            }
        };
        
        let promise = q.makePromise(descriptor);
        
        q.when(promise, function(result) {
            assert.equal(result, value);
            done();
        }).catch(done);
    });
});