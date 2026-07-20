let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.infinite with generator returning different types', function(done) {
        let values = [42, 'hello', true, null, {key: 'value'}];
        let index = 0;
        let generator = () => values[index++ % values.length];
        let source = pull_stream.infinite(generator);
        
        pull_stream(
            source,
            pull_stream.take(7), // More than the array length to test cycling
            pull_stream.collect(function(err, results) {
                assert.ifError(err);
                assert.equal(results.length, 7);
                assert.equal(results[0], 42);
                assert.equal(results[1], 'hello');
                assert.equal(results[2], true);
                assert.equal(results[3], null);
                assert.deepEqual(results[4], {key: 'value'});
                assert.equal(results[5], 42); // Cycling back
                assert.equal(results[6], 'hello');
                done();
            })
        );
    });
});