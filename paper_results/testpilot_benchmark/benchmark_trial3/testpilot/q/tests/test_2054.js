let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with rejected promise', function(done) {
        let rejectedError = new Error('test error');
        let promise = q.reject(rejectedError);
        
        q.done(promise, function(value) {
            done(new Error('Should not have been fulfilled'));
        }, function(error) {
            assert.strictEqual(error, rejectedError);
            done();
        });
    });

    })