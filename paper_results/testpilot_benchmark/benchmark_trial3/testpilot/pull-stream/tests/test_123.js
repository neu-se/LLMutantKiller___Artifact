let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.infinite with default Math.random generator', function(done) {
        let source = pull_stream.infinite();
        let count = 0;
        let values = [];
        
        pull_stream(
            source,
            pull_stream.take(5),
            pull_stream.collect(function(err, results) {
                assert.ifError(err);
                assert.equal(results.length, 5);
                // Check that all values are numbers between 0 and 1 (Math.random behavior)
                results.forEach(val => {
                    assert.equal(typeof val, 'number');
                    assert(val >= 0 && val < 1);
                });
                done();
            })
        );
    });

    })