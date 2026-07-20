let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should reject when resolver calls reject', function(done) {
        const promise = q.Promise((resolve, reject) => {
            reject(new Error('test error'));
        });
        
        promise.then(() => {
            done(new Error('Promise should have been rejected'));
        }).catch((error) => {
            assert.strictEqual(error.message, 'test error');
            done();
        });
    });

    })