let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter with no options', function(done) {
        let emitter = dirty();
        
        // Test that it's an EventEmitter instance
        assert(typeof emitter.on === 'function');
        assert(typeof emitter.emit === 'function');
        assert(typeof emitter.removeListener === 'function');
        
        // Test basic event emission
        emitter.on('test', function(data) {
            assert.equal(data, 'hello');
            done();
        });
        
        emitter.em    })
})