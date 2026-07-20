let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with plain value', function(done) {
        let plainValue = 42;
        
        // q.done() doesn't exist, but we can create a resolved promise
        // and use .done() method on it
        q.resolve(plainValue)
            .done(function(value) {
                assert.strictEqual(value, plainValue);
                done();
            }, function(error) {
                done(error);
            });
    });
});