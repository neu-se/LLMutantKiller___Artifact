let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test', function() {
        let callCount = 0;
        let emitter = new (require('events').EventEmitter)();
        
        let listener = function() {
            callCount++;
        };
        
        emitter.on('test', listener);
        emitter.em    })
})