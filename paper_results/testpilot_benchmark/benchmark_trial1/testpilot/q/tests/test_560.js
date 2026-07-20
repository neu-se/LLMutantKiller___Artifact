let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.timeout - promise resolves before timeout', function(done) {
        // Create a promise that resolves quickly
        let fastPromise = q.delay(50).then(() => 'success');
        
        // Apply timeout that's longer than the promise resolution time
        let timeoutPromise = q.timeout(fastPromise, 100);
        
        timeoutPromise.then(result => {
            assert.equal(result, 'success');
            done();
        }).catch(done);
    });
    
    })