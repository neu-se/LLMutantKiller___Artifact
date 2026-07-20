let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.timeout - resolves before timeout', function(done) {
        let promise = q.resolve('success');
        q.timeout(promise, 100)
            .then(function(result) {
                assert.equal(result, 'success');
                done();
            })
            .catch(done);
    });

    })