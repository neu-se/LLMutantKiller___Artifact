let assert = require('assert');

describe('test promises', function() {
    it('test Promise.resolve resolves immediately', function(done) {
        let startTime = Date.now();
        let promise = Promise.resolve('immediate');
        
        promise.then(function(value) {
            let endTime = Date.now();
            assert.strictEqual(value, 'immediate');
            // Should resolve very quickly (within a few milliseconds)
            assert(endTime - startTime < 10);
            done();
        }).catch(done);
    });
});