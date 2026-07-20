let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should reject when resolver throws an exception', function(done) {
        const promise = q.Promise((resolve, reject) => {
            throw new Error('thrown error');
        });
        
        promise.then(() => {
            done(new Error('Promise should have been rejected'));
        }).catch((error) => {
            assert.strictEqual(error.message, 'thrown error');
            done();
        });
    });

    })