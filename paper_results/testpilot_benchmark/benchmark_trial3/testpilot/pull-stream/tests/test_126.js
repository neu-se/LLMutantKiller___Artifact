let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.infinite generates values continuously', function(done) {
        let callCount = 0;
        let generator = () => {
            callCount++;
            return `value-${callCount}`;
        };
        let source = pull_stream.infinite(generator);
        
        pull_stream(
            source,
            pull_stream.take(10),
            pull_stream.collect(function(err, results) {
                assert.ifError(err);
                assert.equal(results.length, 10);
                assert.equal(callCount, 10);
                // Verify the sequence
                for(let i = 0; i < 10; i++) {
                    assert.equal(results[i], `value-${i + 1}`);
                }
                done();
            })
        );
    });

    })