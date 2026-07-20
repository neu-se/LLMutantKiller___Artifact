let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.onEnd with stream that ends normally', function(done) {
        let dataReceived = [];
        
        pull_stream(
            pull_stream.values(['a', 'b', 'c']),
            pull_stream.through(function(data) {
                dataReceived.push(data);
                return data;
            }),
            pull_stream.onEnd(function(err) {
                assert.strictEqual(err, null, 'Should not have an error');
                assert.deepStrictEqual(dataReceived, ['a', 'b', 'c'], 'All data should have been processed');
                done();
            })
        );
    });
});