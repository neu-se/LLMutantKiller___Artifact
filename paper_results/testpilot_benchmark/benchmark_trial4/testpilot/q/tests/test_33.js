let assert = require('assert');

describe('test q', function() {
    it('should fulfill a number value', function(done) {
        let value = 123;
        let promise = Promise.resolve(value);
        
        promise.then(function(result) {
            assert.strictEqual(result, value);
            done();
        }).catch(done);
    });
});