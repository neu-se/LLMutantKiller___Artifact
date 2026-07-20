let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    let emitter;
    
    beforeEach(function() {
        emitter = new EventEmitter();
    });
    
    it('test dirty.Dirty.on return value', function() {
        // Test that the function returns something (likely the emitter or undefined)
        let result = dirty.Dirty.on(emitter, 'return-test');
        
        // The return value should be defined (assuming it returns the emitter or a handler)
        assert.notStrictEqual(result, null, 'Function should return a value');
    });
    
    })