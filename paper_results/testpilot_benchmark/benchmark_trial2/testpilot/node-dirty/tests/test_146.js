let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test', function(done) {
        let callCount = 0;
        let eventOrder = [];
        let emitter = new EventEmitter();
        
        // Add a regular listener
        emitter.on('test', function() {
            eventOrder.push('regular');
        });
        
        // Add a prependOnceListener that should be called first and only once
        emitter.prependOnceListener('test', function() {
            callCount++;
            eventOrder.push('once');
        });
        
        // Add another regular listener
        emitter.on('test', function() {
            eventOrder.push('regular');
        });
        
        // Emit the event twice to test that once listener is only called once
        emitter.em    })
})