let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.empty - should call end callback with null', function(done) {
        pull_stream(
            pull_stream.empty(),
            function(read) {
                read(null, function(end, data) {
                    assert.strictEqual(end, true, 'Should end immediately');
                    assert.strictEqual(data, undefined, 'Should have no data');
                    done();
                });
            }
        );
    });
});