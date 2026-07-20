let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should find first matching element with test function', function(done) {
        pull_stream(
            pull_stream.values([1, 2, 3, 4, 5]),
            pull_stream.find(x => x > 3, (err, result) => {
                assert.strictEqual(err, null);
                assert.strictEqual(result, 4);
                done();
            })
        );
    });

    })