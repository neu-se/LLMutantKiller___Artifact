let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.prototype.emit - with arguments', function(done) {
        let db = dirty();
        let receivedArgs = [];
        
        db.on('test-event-args', function(arg1, arg2, arg3) {
            receivedArgs = [arg1, arg2, arg3];
            
            // Assert that the arguments were received correctly
            assert.strictEqual(arg1, 'first');
            assert.strictEqual(arg2, 'second');
            assert.strictEqual(arg3, 'third');
            
            done(); // Call done to complete the async test
        });
        
        // Emit the event with arguments
        db.em    })
})