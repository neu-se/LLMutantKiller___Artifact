let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.keys with promise rejection', function(done) {
        let rejectedPromise = q.reject(new Error('Test error'));
        
        rejectedPromise.keys().then(function(keys) {
            done(new Error('Should not resolve'));
        }).catch(function(error) {
            assert.equal(error.message, 'Test error');
            done();
        });
    });

    })