let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with fulfilled promise', function(done) {
        let fulfilled = false;
        
        q.done(q.resolve("test value"), function(value) {
            fulfilled = true;
            assert.equal(value, "test value");
            done();
        });
        
        // Give it a moment to execute
        setTimeout(() => {
            if (!fulfilled) {
                done(new Error("Promise was not fulfilled"));
            }
        }, 10);
    });

    })