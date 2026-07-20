let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.drain with error in operation', function(done) {
        let collected = [];
        let errorThrown = false;
        
        pull_stream(
            pull_stream.values([1, 2, 3]),
            pull_stream.drain(
                function(data) {
                    if (data === 2) {
                        throw new Error('Test error');
                    }
                    collected.push(data);
                },
                function(err) {
                    assert(err instanceof Error);
                    assert.strictEqual(err.message, 'Test error');
                    assert.deepStrictEqual(collected, [1]);
                    done();
                }
            )
        );
    });
});