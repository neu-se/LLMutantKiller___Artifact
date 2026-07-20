let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q promise fcall', function() {
        
        it('should call a function that returns a value', function(done) {
            let promise = q.resolve(function() {
                return 42;
            });
            
            promise.fcall().then(function(result) {
                assert.strictEqual(result, 42);
                done();
            }).catch(done);
        });
    });
});