let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick executes callback with correct context', function(done) {
        let testValue = 42;
        
        q.nextTick(function() {
            assert.strictEqual(testValue, 42);
            done();
        });
    });
});