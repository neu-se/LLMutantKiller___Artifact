let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with empty array', function(done) {
        const source = pull_stream.values([]);
        const results = [];
        
        pull_stream(
            source,
            pull_stream.collect(function(err, data) {
                assert.equal(err, null);
                assert.deepEqual(data, []);
                done();
            })
        );
    });
});