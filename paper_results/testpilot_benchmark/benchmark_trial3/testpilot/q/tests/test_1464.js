let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill promise resolves immediately', function(done) {
        let startTime = Date.now();
        let promise = q.fulfill('immediate');
        
        promise.then(function(value) {
            let endTime = Date.now();
            assert.strictEqual(value, 'immediate');
            // Should resolve very quickly (within a few milliseconds)
            assert(endTime - startTime < 10);
            done();
        }).catch(done);
    });
});