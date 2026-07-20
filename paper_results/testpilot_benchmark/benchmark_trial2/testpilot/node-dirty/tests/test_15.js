let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.addAbortListener - should add listener to abort signal', function(done) {
        const controller = new AbortController();
        const signal = controller.signal;
        let listenerCalled = false;
        
        const listener = () => {
            listenerCalled = true;
            done();
        };
        
        dirty.Dirty.addAbortListener(signal, listener);
        controller.abort();
        
        // Give a small timeout to ensure the listener is called
        setTimeout(() => {
            if (!listenerCalled) {
                done(new Error('Listener was not called'));
            }
        }, 10);
    });
    
    })