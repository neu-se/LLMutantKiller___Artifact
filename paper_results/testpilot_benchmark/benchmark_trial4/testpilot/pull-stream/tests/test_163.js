let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.empty should produce no values', function(done) {
        let values = [];
        
        pull_stream(
            pull_stream.empty(),
            pull_stream.drain(
                function(data) {
                    values.push(data);
                },
                function(err) {
                    assert.strictEqual(err, null);
                    assert.strictEqual(values.length, 0);
                    done();
                }
            )
        );
    });
});