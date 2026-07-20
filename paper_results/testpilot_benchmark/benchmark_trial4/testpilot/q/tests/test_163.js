let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise - immediate reject', function(done) {
        let promise = q.Promise(function(resolve, reject) {
            reject('immediate error');
        });
        
        promise.then(function(value) {
            done(new Error('Should not resolve'));
        }).catch(function(error) {
            assert.equal(error, 'immediate error');
            done();
        });
    });

    })