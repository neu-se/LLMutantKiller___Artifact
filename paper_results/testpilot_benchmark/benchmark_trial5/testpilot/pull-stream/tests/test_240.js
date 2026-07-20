let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filter with regexp', function(done) {
        const source = pull_stream.values(['hello', 'world', 'test', 'hello123']);
        const pattern = /^hello/;
        const results = [];
        
        pull_stream(
            source,
            pull_stream.filter(pattern),
            pull_stream.drain(
                (data) => results.push(data),
                (err) => {
                    assert.strictEqual(err, null);
                    assert.deepStrictEqual(results, ['hello', 'hello123']);
                    done();
                }
            )
        );
    });

    })