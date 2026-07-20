let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test prependListener with event arguments', function(done) {
        let db = dirty();
        let receivedArgs = [];
        
        db.prependListener('args-test', function(arg1, arg2) {
            receivedArgs.push(arg1, arg2);
            // Verify the arguments were received correctly
            assert.strictEqual(arg1, 'first');
            assert.strictEqual(arg2, 'second');
            assert.deepStrictEqual(receivedArgs, ['first', 'second']);
            done();
        });
        
        // Emit the event with test arguments
        db.em    })
})