let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delay - works with zero timeout', function(done) {
        const testValue = 123;
        
        q.resolve(testValue)
            .delay(0)
            .then(function(value) {
                assert.strictEqual(value, testValue, 'Value should be preserved with zero delay');
                done();
            })
            .catch(done);
    });

    })