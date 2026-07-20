let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick.runAfter handles task with parameters', function(done) {
        let result = null;
        
        let task = function(value) {
            result = value;
        };
        
        q.nextTick.runAfter(function() {
            task('test-value');
        });
        
        process.nextTick(function() {
            assert.strictEqual(result, 'test-value');
            done();
        });
    });
    
    })