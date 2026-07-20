let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should create a resolved promise with null value', function(done) {
        let promise = q(null);
        promise.then(function(result) {
            assert.strictEqual(result, null);
            done();
        }).catch(done);
    });
});