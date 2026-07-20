let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick executes callback asynchronously', function(done) {
        let executed = false;
        
        q.nextTick(function() {
            executed = true;
            done();
        });
        
        // Should not be executed yet since nextTick is asynchronous
        assert.strictEqual(executed, false);
    });
    
    })