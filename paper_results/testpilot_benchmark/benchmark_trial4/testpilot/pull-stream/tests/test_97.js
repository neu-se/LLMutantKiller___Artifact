let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with empty array', function(done) {
        const source = pull_stream.values([]);
        
        pull_stream(
            source,
            pull_stream.collect(function(err, data) {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(data, []);
                done();
            })
        );
    });
});