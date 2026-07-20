let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.map with no mapper (identity function)', function(done) {
        const source = pull_stream.values([1, 2, 3]);
        
        pull_stream(
            source,
            pull_stream.map(),
            pull_stream.collect(function(err, results) {
                assert.ifError(err);
                assert.deepEqual(results, [1, 2, 3]);
                done();
            })
        );
    });

    })