let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.finally - multiple finally callbacks', function(done) {
        let firstFinallyCalled = false;
        let secondFinallyCalled = false;
        
        q.resolve('test')
            .finally(function() {
                firstFinallyCalled = true;
            })
            .finally(function() {
                secondFinallyCalled = true;
            })
            .then(function(value) {
                assert.strictEqual(firstFinallyCalled, true, 'first finally should be called');
                assert.strictEqual(secondFinallyCalled, true, 'second finally should be called');
                assert.strictEqual(value, 'test', 'original value should be preserved');
                done();
            })
            .catch(done);
    });
});