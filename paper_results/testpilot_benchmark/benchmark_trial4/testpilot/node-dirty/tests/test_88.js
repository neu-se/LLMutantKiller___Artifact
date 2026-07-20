let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter - event listening and emission', function(done) {
        let db = dirty();  // Create a dirty database instance
        let eventFired = false;
        let testData = { key: 'value' };

        db.on('test-event', function(data) {
            eventFired = true;
            assert.deepStrictEqual(data, testData, 'Event data should match');
            done();
        });

        db.em    })
})