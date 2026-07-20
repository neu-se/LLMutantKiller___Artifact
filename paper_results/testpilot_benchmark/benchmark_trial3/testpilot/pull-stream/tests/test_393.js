let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.flatten with single element arrays', function(done) {
        const source = pull_stream.values([
            ['a'],
            ['b'],
            ['c']
        ]);
        
        pull_stream(
            source,
            pull_stream.flatten(),
            pull_stream.collect(function(err, results) {
                assert.ifError(err);
                assert.deepEqual(results, ['a', 'b', 'c']);
                done();
            })
        );
    });
});