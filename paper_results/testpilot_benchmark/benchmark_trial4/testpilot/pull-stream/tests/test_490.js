let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should return null when no element matches', function(done) {
        pull_stream(
            pull_stream.values([1, 2, 3]),
            pull_stream.find(x => x > 10, (err, result) => {
                assert.strictEqual(err, null);
                assert.strictEqual(result, null);
                done();
            })
        );
    });

    })