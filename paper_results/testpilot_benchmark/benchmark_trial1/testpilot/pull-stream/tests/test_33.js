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
                    this.queue(data.toUpperCase());
                },
                function() {
                    endCalled = true;
                    this.queue('END');
                }
            ),
            pull_stream.drain(function(data) {
                results.push(data);
            }, function(err) {
                assert.ifError(err);
                assert.deepEqual(results, ['A', 'B', 'C', 'END']);
                assert.equal(endCalled, true);
                done();
            })
        );
    });

    })