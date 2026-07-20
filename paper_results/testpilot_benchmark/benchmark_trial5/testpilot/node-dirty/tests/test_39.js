let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('should create a dirty database and handle events', function(done) {
        let db = dirty();
        let eventName = 'test-event';
        let emitter = new EventEmitter();
        
        // Test that we can set and get data
        db.set('key1', 'value1');
        assert.equal(db.get('key1'), 'value1');
        
        // Test event emitter functionality
        emitter.on(eventName, function(data) {
            assert.equal(data, 'test-data');
            done();
        });
        
        emitter.em    })
})