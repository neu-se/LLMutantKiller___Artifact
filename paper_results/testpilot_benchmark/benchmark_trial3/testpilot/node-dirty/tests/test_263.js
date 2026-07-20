let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.prototype.emit - event with arguments', function(done) {
        let db = dirty();
        let receivedArgs = [];
        
        db.on('test-event-args', function(arg1, arg2, arg3) {
            receivedArgs = [arg1, arg2, arg3];
            // Assert that the arguments were received correctly
            assert.deepEqual(receivedArgs, ['hello', 42, true]);
            done();
        });
        
        // Emit the event with test arguments
        db.em    })
})