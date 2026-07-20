let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.reduce with string concatenation', function(done) {
        pull_stream(
            pull_stream.values(['hello', ' ', 'world', '!']),
            pull_stream.reduce((acc, val) => acc + val, '', (err, result) => {
                assert.strictEqual(err, null);
                assert.strictEqual(result, 'hello world!');
                done();
            })
        );
    });
});