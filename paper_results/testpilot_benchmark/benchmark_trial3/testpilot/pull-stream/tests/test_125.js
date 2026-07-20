let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.infinite handles end signal correctly', function(done) {
        let source = pull_stream.infinite(() => 'test');
        
        // Test that source responds correctly to end signal
        source(true, function(end) {
            assert.equal(end, true);
            done();
        });
    });

    })