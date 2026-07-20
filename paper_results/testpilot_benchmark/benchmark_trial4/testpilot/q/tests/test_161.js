let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise - reject', function(done) {
        let promise = q.Promise(function(resolve, reject) {
            setTimeout(function() {
                reject(new Error('test error'));
            }, 10);
        });
        
        promise.then(function(value) {
            done(new Error('Should not resolve'));
        }).catch(function(error) {
            assert.equal(error.message, 'test error');
            done();
        });
    });

    })