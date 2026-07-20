let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.done', function() {
        
        it('should call fulfilled handler when promise resolves', function(done) {
            let promise = q.resolve('test value');
            let fulfilledCalled = false;
            
            promise.done(function(value) {
                fulfilledCalled = true;
                assert.equal(value, 'test value');
                done();
            });
        });

            })
})