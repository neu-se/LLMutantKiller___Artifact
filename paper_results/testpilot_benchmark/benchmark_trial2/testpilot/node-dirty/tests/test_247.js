let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event-args', function(done) {
        let receivedArgs = ['hello', 42, {key: 'value'}];
        
        assert.strictEqual(receivedArgs[0], 'hello');
        assert.strictEqual(receivedArgs[1], 42);
        assert.deepStrictEqual(receivedArgs[2], {key: 'value'});
        done();
    });
});