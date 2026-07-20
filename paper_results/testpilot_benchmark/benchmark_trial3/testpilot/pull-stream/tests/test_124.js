let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.infinite with custom generator', function(done) {
        let counter = 0;
        let customGenerator = () => ++counter;
        let source = pull_stream.infinite(customGenerator);
        
        pull_stream(
            source,
            pull_stream.take(3),
            pull_stream.collect(function(err, results) {
                assert.ifError(err);
                assert.deepEqual(results, [1, 2, 3]);
                done();
            })
        );
    });

    })