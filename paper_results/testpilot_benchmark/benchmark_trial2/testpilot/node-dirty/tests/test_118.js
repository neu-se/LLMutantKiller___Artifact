let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test prependListener with event arguments', function(done) {
        let db = dirty();
        let receivedArgs = [];
        
        db.prependListener('args-test', function(arg1, arg2) {
            receivedArgs.push(arg1, arg2);
            
            // Assert that the arguments were received correctly
            assert.strictEqual(receivedArgs[0], 'first');
            assert.strictEqual(receivedArgs[1], 'second');
            
            done();
        });
        
        // Emit the event with test arguments
        db.em    })
})