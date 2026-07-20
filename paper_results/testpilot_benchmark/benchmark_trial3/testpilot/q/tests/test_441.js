let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.then - chaining', function(done) {
        let resolver;
        let promise = q.makePromise(function(resolve, reject, notify) {
            resolver = { resolve, reject, notify };
        });
        
        promise.then(function(value) {
            return value * 2;
        }).then(function(value) {
            assert.equal(value, 20);
            done();
        }).catch(done);
        
        resolver.resolve(10);
    });
    
    })