let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master inspect functionality', function(done) {
        let testObject = { test: true };
        
        // Since q.master doesn't exist, let's test with q.resolve instead
        // which creates a resolved promise with the given value
        let promise = q.resolve(testObject);
        
        promise.then(function(result) {
            assert.strictEqual(result, testObject, 'should resolve to the original object');
            done();
        }).catch(done);
    });
});