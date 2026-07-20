let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick.runAfter handles task with parameters', function(done) {
        let result = null;
        let expectedValue = 'test-value';
        
        let task = function() {
            result = expectedValue;
            assert.strictEqual(result, expectedValue);
            done();
        };
        
        q.nextTick.runAfter(task);
    });
    
    })