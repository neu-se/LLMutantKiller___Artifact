let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.when with rejected promise', function(done) {
        let promise = q.reject(new Error('failure'));
        
        q.when(promise,
            function(value) {
                done(new Error('Should not be fulfilled'));
            },
            function(error) {
                assert.equal(error.message, 'failure');
                done();
            }
        );
    });

    })