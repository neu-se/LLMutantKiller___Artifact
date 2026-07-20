let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.then - fulfilled case', function(done) {
        let resolver;
        let promise = q.makePromise(function(resolve, reject, notify) {
            resolver = { resolve, reject, notify };
        });
        
        promise.then(function(value) {
            assert.equal(value, 'success');
            done();
        }, function(error) {
            done(error);
        });
        
        resolver.resolve('success');
    });
    
    })