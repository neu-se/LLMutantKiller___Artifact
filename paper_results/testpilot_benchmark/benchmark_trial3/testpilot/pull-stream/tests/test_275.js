let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.through onEnd called only once', function(done) {
        let onEndCallCount = 0;
        let source = pull_stream.values([1, 2]);
        
        let throughStream = pull_stream.through(
            null,
            function(abort) {
                onEndCallCount++;
            }
        );
        
        pull_stream(
            source,
            throughStream,
            pull_stream.collect(function(err, results) {
                assert.equal(err, null);
                assert.equal(onEndCallCount, 1);
                done();
            })
        );
    });

    })