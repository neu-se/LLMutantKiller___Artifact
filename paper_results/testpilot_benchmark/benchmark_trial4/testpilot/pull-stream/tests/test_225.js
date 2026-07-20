let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.asyncMap maintains order', function(done) {
        const source = pull_stream.values([1, 2, 3, 4]);
        const asyncMapWithVariableDelay = pull_stream.asyncMap((value, callback) => {
            // Longer delay for smaller numbers to test order preservation
            const delay = (5 - value) * 10;
            setTimeout(() => {
                callback(null, `item-${value}`);
            }, delay);
        });
        
        const results = [];
        pull_stream(
            source,
            asyncMapWithVariableDelay,
            pull_stream.drain(
                (data) => results.push(data),
                (err) => {
                    assert.ifError(err);
                    assert.deepEqual(results, ['item-1', 'item-2', 'item-3', 'item-4']);
                    done();
                }
            )
        );
    });
});