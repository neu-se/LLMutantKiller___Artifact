let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.through - multiple outputs per input', function(done) {
        let results = [];
        
        pull_stream(
            pull_stream.values([1, 2, 3]),
            pull_stream.through(function(data) {
                this.queue(data);
                this.queue(data * 10);
            }),
            pull_stream.drain(function(data) {
                results.push(data);
            }, function(err) {
                assert.ifError(err);
                assert.deepEqual(results, [1, 10, 2, 20, 3, 30]);
                done();
            })
        );
    });
});