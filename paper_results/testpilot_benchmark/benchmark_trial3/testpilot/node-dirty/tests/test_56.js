let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter with once listener', function(done) {
        let emitter = dirty.Dirty.EventEmitter();
        let callCount = 0;
        
        emitter.once('test', function() {
            callCount++;
        });
        
        emitter.em    })
})