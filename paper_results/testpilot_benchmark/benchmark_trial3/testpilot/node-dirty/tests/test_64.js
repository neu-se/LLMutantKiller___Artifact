let mocha = require('mocha');
let assert = require('assert');
let { EventEmitter } = require('events');

describe('test dirty', function() {
    it('test EventEmitter with once listener', function(done) {
        let emitter = new EventEmitter();
        let callCount = 0;
        
        emitter.once('test', function() {
            callCount++;
            assert.equal(callCount, 1);
            done();
        });
        
        emitter.em    })
})