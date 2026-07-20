let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.done', function() {
        
        it('should work without any handlers', function(done) {
            let promise = q.resolve('test value');
            
            // Should not throw an error
            promise.done();
            
            // Give it a tick to ensure no errors are thrown
            setTimeout(done, 10);
        });

            })
})