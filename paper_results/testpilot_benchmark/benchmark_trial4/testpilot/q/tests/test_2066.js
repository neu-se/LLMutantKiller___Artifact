let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done without callbacks', function(done) {
        let promise = q.resolve('test');
        
        // Should not throw when called without callbacks
        try {
            q.done(promise);
            setTimeout(done, 10); // Give it time to process
        } catch (error) {
            done(error);
        }
    });
});