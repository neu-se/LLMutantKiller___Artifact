let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.error - should work with string errors', function(done) {
        const stringError = 'String error message';
        
        pull_stream(
            pull_stream.error(stringError),
            pull_stream.drain(
                function(data) {
                    done(new Error('Should not receive data'));
                },
                function(err) {
                    assert.strictEqual(err, stringError);
                    done();
                }
            )
        );
    });
});