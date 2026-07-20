let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.through with onEnd callback', function(done) {
        let onEndCalled = false;
        let source = pull_stream.values([1, 2, 3]);
        
        let throughStream = pull_stream.through(
            null,
            function(abort) {
                onEndCalled = true;
                assert.equal(abort, null);
            }
        );
        
        pull_stream(
            source,
            throughStream,
            pull_stream.collect(function(err, results) {
                assert.equal(err, null);
                assert.deepEqual(results, [1, 2, 3]);
                assert.equal(onEndCalled, true);
                done();
            })
        );
    });

    })