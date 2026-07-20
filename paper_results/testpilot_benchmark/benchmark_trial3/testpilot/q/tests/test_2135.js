let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delay with zero timeout', function(done) {
        const testValue = 'immediate';
        
        q.delay(testValue, 0)
            .then(function(result) {
                assert.strictEqual(result, testValue);
                done();
            })
            .catch(done);
    });

    })