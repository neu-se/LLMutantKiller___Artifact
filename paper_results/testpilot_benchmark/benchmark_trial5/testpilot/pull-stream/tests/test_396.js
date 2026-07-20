let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.flatten with empty source', function(done) {
        const source = pull_stream.values([]);
        
        const result = [];
        pull_stream(
            source,
            pull_stream.flatten(),
            pull_stream.drain(function(data) {
                result.push(data);
            }, function(err) {
                assert.strictEqual(err, true); // end of stream
                assert.deepStrictEqual(result, []);
                done();
            })
        );
    });

    })