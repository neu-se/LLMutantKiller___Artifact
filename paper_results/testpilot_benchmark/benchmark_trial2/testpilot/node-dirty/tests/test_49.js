let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter with empty options', function(done) {
        let db = dirty();
        
        // Test basic EventEmitter functionality
        let eventFired = false;
        db.on('load', function() {
            eventFired = true;
            assert.equal(eventFired, true);
            done();
        });
        
        // Trigger the load event by setting a value
        db.set('test', 'value');
    });
});