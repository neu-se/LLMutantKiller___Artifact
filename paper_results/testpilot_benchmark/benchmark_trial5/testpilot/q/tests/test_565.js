let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with fulfilled promise', function(done) {
        let testValue = 'test result';
        let promise = q.resolve(testValue);
        
        q.done(promise, function(value) {
            assert.equal(value, testValue);
            done();
        }, function(error) {
            done(error);
        });
    });

    })