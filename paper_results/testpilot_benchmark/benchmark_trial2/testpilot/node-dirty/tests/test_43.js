let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter listener removal', function(done) {
        let emitter = dirty();  // Create a dirty database instance which is an EventEmitter
        let callCount = 0;
        
        function listener() {
            callCount++;
        }
        
        emitter.on('test', listener);
        emitter.em    })
})