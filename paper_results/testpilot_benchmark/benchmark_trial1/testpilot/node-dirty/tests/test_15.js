let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.addAbortListener - should add listener to signal', function(done) {
        const controller = new AbortController();
        const signal = controller.signal;
        let listenerCalled = false;
        
        const listener = () => {
            listenerCalled = true;
        };
        
        // Add the abort listener
        dirty.Dirty.addAbortListener(signal, listener);
        
        // Trigger abort
        controller.abort();
        
        // Give it a moment for the listener to be called
        setTimeout(() => {
            assert.strictEqual(listenerCalled, true, 'Abort listener should have been called');
            done();
        }, 10);
    });
    
    })