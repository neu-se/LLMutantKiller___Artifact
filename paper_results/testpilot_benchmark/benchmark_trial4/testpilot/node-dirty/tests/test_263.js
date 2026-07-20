let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let { AsyncResource } = require('async_hooks');

describe('test dirty', function() {
    it('should emit events through EventEmitterAsyncResource', function(done) {
        const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({
            name: 'test-resource'
        });
        
        emitter.on('test-event', (data) => {
            assert.strictEqual(data, 'test-data');
            done();
        });
        
        emitter.em    })
})