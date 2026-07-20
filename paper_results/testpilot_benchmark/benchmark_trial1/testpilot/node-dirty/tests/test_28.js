let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    let emitter;
    
    beforeEach(function() {
        emitter = new EventEmitter();
    });
    
    it('event2');
        
        setTimeout(() => {
            assert.strictEqual(event1Fired, true, 'Event1 should have been fired');
            assert.strictEqual(event2Fired, true, 'Event2 should have been fired');
            done();
        }, 10);
    });