let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick with task that throws error', function(done) {
        // This test ensures the function can handle tasks that throw errors
        // We'll schedule a normal task after the error-throwing one to verify
        // the queue continues processing
        let normalTaskExecuted = false;
        
        q.nextTick(function() {
            throw new Error('Test error');
        });
        
        q.nextTick(function() {
            normalTaskExecuted = true;
            assert.strictEqual(normalTaskExecuted, true);
            done();
        });
    });
    
    })