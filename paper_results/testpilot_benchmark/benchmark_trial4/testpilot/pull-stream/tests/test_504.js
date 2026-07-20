let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.find - finds string in array', function(done) {
        pull_stream(
            pull_stream.values(['apple', 'banana', 'cherry']),
            pull_stream.find(x => x.startsWith('b')),
            pull_stream.drain((result) => {
                assert.strictEqual(result, 'banana');
                done();
            }, (err) => {
                if (err) done(err);
            })
        );
    });
});