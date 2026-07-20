let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.asyncMap with empty stream', function(done) {
        const source = pull_stream.values([]);
        const asyncDouble = pull_stream.asyncMap((value, callback) => {
            setTimeout(() => callback(null, value * 2), 10);
        });
        const sink = pull_stream.collect((err, results) => {
            assert.ifError(err);
            assert.deepEqual(results, []);
            done();
        });
        
        pull_stream(source, asyncDouble, sink);
    });

    })