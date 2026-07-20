let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delay with undefined value', function(done) {
        const delayMs = 25;
        
        q.delay(undefined, delayMs)
            .then(function(result) {
                assert.strictEqual(result, undefined);
                done();
            })
            .catch(done);
    });
});