let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let { EventEmitter } = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.getMaxListeners with EventEmitter', function(done) {
        // Test with EventEmitter instance
        const emitter = new EventEmitter();
        emitter.setMaxListeners(15);
        
        const maxListeners = dirty.Dirty.getMaxListeners(emitter);
        assert.strictEqual(maxListeners, 15);
        done();
    });

    })