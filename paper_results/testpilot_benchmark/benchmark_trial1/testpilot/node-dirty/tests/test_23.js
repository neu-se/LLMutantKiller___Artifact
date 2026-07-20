let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    let emitter;
    
    beforeEach(function() {
        emitter = new EventEmitter();
    });
    
    it('test-event-with-options');
        
        setTimeout(() => {
            assert.strictEqual(eventCount, 2, 'Event should have been fired twice');
            done();
        }, 10);
    });