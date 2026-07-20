let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master inspect functionality', function(done) {
        let testObject = { data: 'inspect me' };
        
        // Create a resolved promise with the test object
        let promise = q.resolve(testObject);
        
        // Test that q.when works with the promise
        q.when(promise).then(function(result) {
            assert.strictEqual(result, testObject);
            done();
        }).catch(done);
    });
});