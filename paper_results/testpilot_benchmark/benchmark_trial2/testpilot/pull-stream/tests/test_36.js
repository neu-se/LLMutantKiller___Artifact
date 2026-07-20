let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.through - with onEnd callback', function(done) {
        let results = [];
        let endCalled = false;
        
        pull_stream(
            pull_stream.values(['a', 'b', 'c']),
            pull_stream.through(
                function(data) {
                    return data.toUpperCase();
                },
                function() {
                    endCalled = true;
                }
            ),
            pull_stream.map(function(data) {
                return data;
            }),
            pull_stream.concat(function(err, array) {
                if (endCalled) {
                    array.push('END');
                }
                results = array;
            }),
            pull_stream.drain(function(data) {
                // This won't be called with concat
            }, function(err) {
                assert.ifError(err);
                assert.deepEqual(results, ['A', 'B', 'C', 'END']);
                assert.equal(endCalled, true);
                done();
            })
        );
    });
});