let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick with function that has parameters', function(done) {
        let receivedValue = null;
        
        function taskWithContext() {
            receivedValue = 'test value';
        }
        
        q.nextTick(taskWithContext);
        
        setTimeout(function() {
            assert.strictEqual(receivedValue, 'test value');
            done();
        }, 10);
    });
    
    })