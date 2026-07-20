let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should create a resolved promise with a number value', function(done) {
        let promise = q(42);
        promise.then(function(result) {
            assert.strictEqual(result, 42);
            done();
        }).catch(done);
    });
});