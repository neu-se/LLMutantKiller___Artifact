let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.map with empty stream', function(done) {
        const source = pull_stream.values([]);
        const mapper = pull_stream.map(x => x * 2);
        const sink = pull_stream.collect((err, results) => {
            assert.ifError(err);
            assert.deepEqual(results, []);
            done();
        });
        
        pull_stream(source, mapper, sink);
    });

    })