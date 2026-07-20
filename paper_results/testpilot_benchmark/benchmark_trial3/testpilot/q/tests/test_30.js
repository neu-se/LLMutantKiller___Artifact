let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should fulfill a number value', function(done) {
        let value = 123;
        let promise = q(value);
        
        promise.then(function(result) {
            assert.strictEqual(result, value);
            done();
        }).catch(done);
    });
});