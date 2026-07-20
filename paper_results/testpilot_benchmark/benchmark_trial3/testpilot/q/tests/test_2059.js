let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with rejected promise throws exception', function(done) {
        let promise = q.reject(new Error('test error'));
        
        // Capture uncaught exceptions to verify q.done throws them
        let originalHandler = process.listeners('uncaughtException');
        process.removeAllListeners('uncaughtException');
        
        process.once('uncaughtException', function(error) {
            // Restore original handlers
            originalHandler.forEach(handler => process.on('uncaughtException', handler));
            
            assert.equal(error.message, 'test error');
            done();
        });
        
        q.done(promise);
    });

    })