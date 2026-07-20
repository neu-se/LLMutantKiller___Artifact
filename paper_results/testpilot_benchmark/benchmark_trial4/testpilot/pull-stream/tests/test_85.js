let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with abort', function(done) {
        let aborted = false;
        const onAbort = function() {
            aborted = true;
        };
        
        const source = pull_stream.values([1, 2, 3, 4, 5], onAbort);
        
        // Manually call the source function to test abort
        source(true, function(end, data) {
            assert.strictEqual(aborted, true);
            done();
        });
    });

    })