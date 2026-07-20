let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter with empty options', function(done) {
        let emitter = dirty.Dirty.EventEmitter({});
        
        // Test multiple listeners
        let count = 0;
        emitter.on('increment', function() {
            count++;
        });
        
        emitter.on('increment', function() {
            count++;
            if (count === 2) {
                done();
            }
        });
        
        emitter.em    })
})