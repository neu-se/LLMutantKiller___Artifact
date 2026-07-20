let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('multi-test', function(done) {
        let db = dirty();
        let firstListenerCalled = false;
        let secondListenerCalled = false;
        
        // Add listeners
        db.once('load', function() {
            firstListenerCalled = true;
        });
        
        db.once('load', function() {
            secondListenerCalled = true;
        });
        
        // Trigger the load event
        db.em    })
})