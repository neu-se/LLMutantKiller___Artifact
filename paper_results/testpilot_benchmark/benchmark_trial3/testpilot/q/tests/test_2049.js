let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with rejected promise', function(done) {
        let promise = q.reject(new Error('test error'));
        let rejectedCalled = false;
        
        promise.done(
            function(value) {
                done(new Error('Should not call fulfilled handler'));
            },
            function(error) {
                rejectedCalled = true;
                assert.equal(error.message, 'test error');
                done();
            }
        );
    });

    })