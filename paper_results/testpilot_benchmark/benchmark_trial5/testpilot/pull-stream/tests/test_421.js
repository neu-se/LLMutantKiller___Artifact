let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.drain with simple array source', function(done) {
        let collected = [];
        
        pull_stream(
            pull_stream.values([1, 2, 3, 4, 5]),
            pull_stream.drain(
                function(data) {
                    collected.push(data);
                },
                function(err) {
                    assert.strictEqual(err, null);
                    assert.deepStrictEqual(collected, [1, 2, 3, 4, 5]);
                    done();
                }
            )
        );
    });

    })