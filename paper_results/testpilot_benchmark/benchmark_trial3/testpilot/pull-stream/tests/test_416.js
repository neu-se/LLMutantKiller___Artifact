let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.drain with string data', function(done) {
        let result = '';
        
        pull_stream(
            pull_stream.values(['hello', ' ', 'world']),
            pull_stream.drain(
                function(data) {
                    result += data;
                },
                function(err) {
                    assert.strictEqual(err, null);
                    assert.strictEqual(result, 'hello world');
                    done();
                }
            )
        );
    });
});