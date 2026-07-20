let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on with multiple events', function(done) {
        const emitter = new EventEmitter();
        const event1 = 'event1';
        const event2 = 'event2';
        let eventCount = 0;
        
        dirty.Dirty.on(emitter, event1);
        dirty.Dirty.on(emitter, event2);
        
        const checkComplete = () => {
            eventCount++;
            if (eventCount === 2) {
                done();
            }
        };
        
        emitter.on(event1, checkComplete);
        emitter.on(event2, checkComplete);
        
        emitter.em    })
})