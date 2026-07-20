let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick executes callback asynchronously', function(done) {
        let executed = false;
        
        q.nextTick(function() {
            executed = true;
            assert.strictEqual(executed, true);
            done();
        });
        
        // At this point, the callback should not have executed yet
        assert.strictEqual(executed, false);
    });
    
    })