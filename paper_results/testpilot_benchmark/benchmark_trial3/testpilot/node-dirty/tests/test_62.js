let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let { EventEmitter } = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter error handling', function(done) {
        let emitter = new EventEmitter();
        
        emitter.on('error', function(err) {
            assert(err instanceof Error);
            assert.equal(err.message, 'test error');
            done();
        });
        
        emitter.em    })
})