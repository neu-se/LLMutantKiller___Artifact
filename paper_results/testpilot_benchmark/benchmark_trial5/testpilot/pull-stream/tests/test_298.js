let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.through - filtering data', function(done) {
        let results = [];
        
        pull_stream(
            pull_stream.values([1, 2, 3, 4, 5, 6]),
            pull_stream.filter(function(data) {
                return data % 2 === 0;
            }),
            pull_stream.drain(function(data) {
                results.push(data);
            }, function(err) {
                assert.ifError(err);
                assert.deepEqual(results, [2, 4, 6]);
                done();
            })
        );
    });
});