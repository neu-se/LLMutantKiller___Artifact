let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick executes task asynchronously', function(done) {
        let executed = false;
        
        q.nextTick(function() {
            executed = true;
            done();
        });
        
        // Task should not be executed synchronously
        assert.strictEqual(executed, false);
    });
    
    })