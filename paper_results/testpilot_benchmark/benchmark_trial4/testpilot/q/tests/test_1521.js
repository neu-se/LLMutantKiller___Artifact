let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spread with rejected promise', function(done) {
        let promise = q.reject(new Error('test error'));
        
        q.spread(promise, function() {
            done(new Error('Should not call fulfilled handler'));
        }, function(error) {
            assert.equal(error.message, 'test error');
            done();
        });
    });

    })