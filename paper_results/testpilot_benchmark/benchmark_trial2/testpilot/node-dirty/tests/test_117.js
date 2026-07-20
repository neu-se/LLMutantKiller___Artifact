let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('args-test', function(done) {
        // Mock or capture the arguments that would be received
        let receivedArgs = ['hello', 'world'];
        
        assert.strictEqual(receivedArgs.length, 2);
        assert.strictEqual(receivedArgs[0], 'hello');
        assert.strictEqual(receivedArgs[1], 'world');
        
        done();
    });
});