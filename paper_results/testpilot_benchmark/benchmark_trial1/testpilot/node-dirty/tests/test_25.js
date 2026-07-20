let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    let emitter;
    
    beforeEach(function() {
        emitter = new EventEmitter();
    });
    
    it('data-event', { message: 'test data' });
        
        setTimeout(() => {
            assert.deepStrictEqual(eventData, { message: 'test data' }, 'Event data should be preserved');
            done();
        }, 10);
    });