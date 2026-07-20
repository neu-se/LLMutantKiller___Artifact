let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delay with timeout only', function(done) {
        const startTime = Date.now();
        const timeout = 100;
        
        q.delay(timeout).then(function(result) {
            const elapsed = Date.now() - startTime;
            assert(elapsed >= timeout - 10, 'Should delay for at least the specified time');
            assert(result === undefined, 'Should resolve with undefined when no object is provided');
            done();
        }).catch(done);
    });

    })