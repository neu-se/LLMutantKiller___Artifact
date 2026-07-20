let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter event handling', function(done) {
        let emitter = dirty.Dirty.EventEmitter({ maxListeners: 10 });
        let callCount = 0;
        
        // Test multiple listeners
        emitter.on('increment', function() {
            callCount++;
        });
        
        emitter.on('increment', function() {
            callCount++;
        });
        
        emitter.em    })
})