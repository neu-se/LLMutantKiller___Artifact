let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('args-test', 'hello', 42, {test: true});
        
        // Verify arguments were passed correctly
        assert.deepStrictEqual(receivedArgs, ['hello', 42, {test: true}], 'arguments should be passed correctly');
        
        // Reset and emit again to verify listener was removed
        receivedArgs = null;
        db.em})