let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.through - empty stream', function(done) {
        let results = [];
        let endCalled = false;
        
        pull_stream(
            pull_stream.values([]),
            pull_stream.through(
                function(data) {
                    this.queue(data);
                },
                function() {
                    endCalled = true;
                }
            ),
            pull_stream.drain(function(data) {
                results.push(data);
            }, function(err) {
                assert.ifError(err);
                assert.deepEqual(results, []);
                assert.equal(endCalled, true);
                done();
            })
        );
    });

    })