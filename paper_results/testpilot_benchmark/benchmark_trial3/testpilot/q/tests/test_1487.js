let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill with primitive value', function(done) {
        let promise = q.fulfill(42);
        
        promise.then(function(value) {
            assert.strictEqual(value, 42);
            done();
        }).catch(done);
    });
});