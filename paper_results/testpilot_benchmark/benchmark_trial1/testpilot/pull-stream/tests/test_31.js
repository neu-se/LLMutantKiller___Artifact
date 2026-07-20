let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.through - basic transformation', function(done) {
        let results = [];
        
        pull_stream(
            pull_stream.values([1, 2, 3, 4, 5]),
            pull_stream.through(function(data) {
                this.queue(data * 2);
            }),
            pull_stream.drain(function(data) {
                results.push(data);
            }, function(err) {
                assert.ifError(err);
                assert.deepEqual(results, [2, 4, 6, 8, 10]);
                done();
            })
        );
    });

    })