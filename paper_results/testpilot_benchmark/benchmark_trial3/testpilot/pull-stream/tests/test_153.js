let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.empty - should emit no data and end immediately', function(done) {
        let dataReceived = [];
        
        pull_stream(
            pull_stream.empty(),
            pull_stream.drain(
                function(data) {
                    dataReceived.push(data);
                },
                function(err) {
                    assert.strictEqual(err, null, 'Should not have an error');
                    assert.strictEqual(dataReceived.length, 0, 'Should receive no data');
                    done();
                }
            )
        );
    });
});