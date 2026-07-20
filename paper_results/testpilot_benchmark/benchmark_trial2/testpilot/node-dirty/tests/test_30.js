let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter with no options', function(done) {
        let emitter = dirty.Dirty.EventEmitter();
        
        // Test that it's an EventEmitter instance
        assert(typeof emitter.on === 'function', 'should have on method');
        assert(typeof emitter.emit === 'function', 'should have emit method');
        assert(typeof emitter.removeListener === 'function', 'should have removeListener method');
        
        done();
    });

    })