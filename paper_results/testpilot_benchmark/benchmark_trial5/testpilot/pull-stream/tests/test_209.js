let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.map with number transformation', function(done) {
        const source = pull_stream.values([1, 2, 3, 4, 5]);
        const mapper = pull_stream.map(x => x * 2);
        const sink = pull_stream.collect((err, results) => {
            assert.ifError(err);
            assert.deepEqual(results, [2, 4, 6, 8, 10]);
            done();
        });
        
        pull_stream(source, mapper, sink);
    });
});