let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done without callbacks', function(done) {
        let promise = q.resolve('test value');
        
        // Should not throw when called without callbacks
        try {
            promise.done();
            setTimeout(done, 10); // Give it time to process
        } catch (error) {
            done(error);
        }
    });

    })