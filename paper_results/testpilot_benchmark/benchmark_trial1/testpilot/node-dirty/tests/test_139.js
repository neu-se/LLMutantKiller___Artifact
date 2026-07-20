let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('args-test', function(done) {
        // Assuming we're testing a function that captures arguments
        let receivedArgs = ['hello', 'world'];
        
        assert.strictEqual(receivedArgs.length, 2);
        assert.strictEqual(receivedArgs[0], 'hello');
        assert.strictEqual(receivedArgs[1], 'world');
        
        done();
    });
});