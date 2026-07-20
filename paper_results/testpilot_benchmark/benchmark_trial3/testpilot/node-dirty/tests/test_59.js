let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter error handling', function(done) {
        let emitter = dirty.Dirty.EventEmitter();
        
        emitter.on('error', function(err) {
            assert(err instanceof Error);
            assert.equal(err.message, 'test error');
            done();
        });
        
        emitter.em    })
})