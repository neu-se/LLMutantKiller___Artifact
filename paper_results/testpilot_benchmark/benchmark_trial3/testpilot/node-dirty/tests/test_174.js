let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test prependOnceListener with arguments', function(done) {
        let db = dirty();
        let receivedArgs = null;
        
        db.prependOnceListener('args-test', function(arg1, arg2, arg3) {
            receivedArgs = [arg1, arg2, arg3];
            // Add assertions to verify the arguments were received correctly
            assert.strictEqual(arg1, 'first');
            assert.strictEqual(arg2, 'second');
            assert.strictEqual(arg3, 'third');
            done(); // Call done to complete the async test
        });
        
        // Emit with arguments
        db.em    })
})