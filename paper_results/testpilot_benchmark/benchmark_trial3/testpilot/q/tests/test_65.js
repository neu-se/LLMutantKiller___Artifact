let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick.runAfter handles task that throws error', function(done) {
        let errorThrown = false;
        
        let task = function() {
            throw new Error('Test error');
        };
        
        // Capture uncaught exceptions temporarily
        let originalHandler = process.listeners('uncaughtException');
        process.removeAllListeners('uncaughtException');
        
        process.once('uncaughtException', function(err) {
            errorThrown = true;
            assert.strictEqual(err.message, 'Test error');
            
            // Restore original handlers
            originalHandler.forEach(handler => {
                process.on('uncaughtException', handler);
            });
            
            done();
        });
        
        q.nextTick.runAfter(task);
    });
    
    })