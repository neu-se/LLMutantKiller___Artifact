let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let receivedArgs = null;
    let db;
    
    beforeEach(function() {
        db = dirty();
        receivedArgs = null;
    });
    
    it('args-test', function() {
        // Set up event listener to capture arguments
        db.on('test-event', function() {
            receivedArgs = Array.prototype.slice.call(arguments);
        });
        
        // Emit event with test arguments
        db.em    })
})