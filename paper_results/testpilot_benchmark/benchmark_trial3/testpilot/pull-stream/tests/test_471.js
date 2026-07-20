let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should handle empty stream', function(done) {
        pull_stream(
            pull_stream.values([]),
            pull_stream.find(x => x > 0, (err, result) => {
                assert.strictEqual(err, null);
                assert.strictEqual(result, null);
                done();
            })
        );
    });

    })