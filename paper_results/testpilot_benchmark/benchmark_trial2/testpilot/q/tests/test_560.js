let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with fulfilled promise', function(done) {
        let promise = q.resolve('success');
        
        q.done(promise, function(value) {
            assert.equal(value, 'success');
            done();
        }, function(error) {
            done(error);
        });
    });

    })