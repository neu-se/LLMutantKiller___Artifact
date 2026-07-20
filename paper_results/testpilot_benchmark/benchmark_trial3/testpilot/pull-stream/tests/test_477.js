let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should use identity function when only callback provided', function(done) {
        pull_stream(
            pull_stream.values([false, 0, '', 'found', 'second']),
            pull_stream.find(x => x), // predicate function that finds first truthy value
            pull_stream.drain((result) => {
                assert.strictEqual(result, 'found');
                done();
            }, (err) => {
                if (err) done(err);
            })
        );
    });
});