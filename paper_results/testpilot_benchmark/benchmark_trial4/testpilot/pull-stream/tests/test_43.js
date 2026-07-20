let assert = require('assert');
let pull = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream with object keys', function(done) {
        const testObject = { a: 1, b: 2, c: 3 };
        
        pull(
            pull.values(Object.keys(testObject)),
            pull.collect(function(err, keys) {
                if (err) return done(err);
                assert.deepEqual(keys.sort(), ['a', 'b', 'c']);
                done();
            })
        );
    });
});