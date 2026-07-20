let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', 'first', 42, { key: 'value' });
        
        // Verify arguments were passed correctly
        setTimeout(() => {
            assert.strictEqual(receivedArgs.length, 3, 'Should receive 3 arguments');
            assert.strictEqual(receivedArgs[0], 'first', 'First argument should match');
            assert.strictEqual(receivedArgs[1], 42, 'Second argument should match');
            assert.deepStrictEqual(receivedArgs[2], { key: 'value' }, 'Third argument should match');
            done();
        }, 10);
    });