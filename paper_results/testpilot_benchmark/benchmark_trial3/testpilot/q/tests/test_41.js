let assert = require('assert');

describe('test q', function() {
    it('should create a resolved promise with a string value', function(done) {
        let promise = Promise.resolve('hello world');
        promise.then(function(result) {
            assert.strictEqual(result, 'hello world');
            done();
        }).catch(done);
    });
});