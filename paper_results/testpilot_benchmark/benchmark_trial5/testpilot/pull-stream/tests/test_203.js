let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.map with type conversion', function(done) {
        const source = pull_stream.values([1, 2, 3]);
        const mapper = pull_stream.map(num => `number: ${num}`);
        const sink = pull_stream.collect((err, results) => {
            assert.ifError(err);
            assert.deepEqual(results, ['number: 1', 'number: 2', 'number: 3']);
            done();
        });
        
        pull_stream(source, mapper, sink);
    });
});