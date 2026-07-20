let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.onEnd passes through data unchanged', function(done) {
        let receivedData = [];
        
        pull_stream(
            pull_stream.values([1, 2, 3]),
            pull_stream.drain(function(data) {
                receivedData.push(data);
            }, function(err) {
                assert.strictEqual(err, null, 'Should not have an error');
                assert.deepStrictEqual(receivedData, [1, 2, 3], 'Data should pass through unchanged');
                done();
            })
        );
    });
});