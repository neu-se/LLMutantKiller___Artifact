let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.reduce with array accumulation', function(done) {
        pull_stream(
            pull_stream.values([1, 2, 3]),
            pull_stream.reduce(function(acc, data) {
                acc.push(data * 2);
                return acc;
            }, [], function(err, result) {
                assert.equal(err, null);
                assert.deepEqual(result, [2, 4, 6]);
                done();
            })
        );
    });
});