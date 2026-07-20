let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - with rejected promise', function(done) {
        let rejectedPromise = q.reject(new Error('Test error'));
        let boundFunction = rejectedPromise.fbind(1, 2);
        
        boundFunction(3).then(function(result) {
            done(new Error('Should not resolve'));
        }).catch(function(error) {
            assert.equal(error.message, 'Test error');
            done();
        });
    });

    })