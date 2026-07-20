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
        
        // This should run before the nextTick callback
        assert.strictEqual(executed, false);
    });
    
    })