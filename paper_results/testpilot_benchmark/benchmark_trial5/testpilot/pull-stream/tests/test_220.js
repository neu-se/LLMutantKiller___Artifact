let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.asyncMap with string transformation', function(done) {
        const source = pull_stream.values(['hello', 'world']);
        const asyncUpperCase = pull_stream.asyncMap((value, callback) => {
            setTimeout(() => callback(null, value.toUpperCase()), 5);
        });
        const sink = pull_stream.collect((err, results) => {
            assert.ifError(err);
            assert.deepEqual(results, ['HELLO', 'WORLD']);
            done();
        });
        
        pull_stream(source, asyncUpperCase, sink);
    });
});