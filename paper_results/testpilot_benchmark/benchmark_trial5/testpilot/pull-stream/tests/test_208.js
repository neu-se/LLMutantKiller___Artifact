let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.map with string transformation', function(done) {
        const source = pull_stream.values(['hello', 'world', 'test']);
        const mapper = pull_stream.map(str => str.toUpperCase());
        const sink = pull_stream.collect((err, results) => {
            assert.ifError(err);
            assert.deepEqual(results, ['HELLO', 'WORLD', 'TEST']);
            done();
        });
        
        pull_stream(source, mapper, sink);
    });
});