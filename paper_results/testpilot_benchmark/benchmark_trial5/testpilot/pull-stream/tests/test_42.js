let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.keys with empty object', function(done) {
        const testObject = {};
        
        pull_stream(
            pull_stream.values(Object.keys(testObject)),
            pull_stream.collect(function(err, keys) {
                if (err) return done(err);
                assert.deepEqual(keys, []);
                done();
            })
        );
    });
});