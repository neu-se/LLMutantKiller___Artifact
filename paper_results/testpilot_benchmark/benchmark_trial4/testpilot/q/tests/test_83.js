let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick.runAfter handles task with parameters', function(done) {
        let result = null;
        
        let task = function(value) {
            result = value * 2;
        };
        
        q.nextTick.runAfter(function() {
            task(5);
        });
        
        process.nextTick(function() {
            assert.strictEqual(result, 10);
            done();
        });
    });
});