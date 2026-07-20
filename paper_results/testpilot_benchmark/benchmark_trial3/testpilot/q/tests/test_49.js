let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick with function that has parameters', function(done) {
        let receivedValue = null;
        
        function taskWithClosure(value) {
            return function() {
                receivedValue = value;
                assert.strictEqual(receivedValue, 'test-value');
                done();
            };
        }
        
        q.nextTick(taskWithClosure('test-value'));
    });
    
    })