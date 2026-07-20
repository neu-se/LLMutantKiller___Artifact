let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let { EventEmitter } = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.getMaxListeners with EventEmitter', function(done) {
        const emitter = new EventEmitter();
        emitter.setMaxListeners(15);
        
        const result = dirty.Dirty.getMaxListeners(emitter);
        assert.strictEqual(result, 15);
        done();
    });

    })