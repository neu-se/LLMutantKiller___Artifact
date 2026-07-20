let assert = require('assert');
let pull = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.onEnd with transform stream', function(done) {
        let processedValues = [];
        
        pull(
            pull.values([1, 2, 3]),
            pull.map(x => x * 2),
            pull.through(function(data) {
                processedValues.push(data);
                return data;
            }),
            pull.drain(null, function(err) {
                assert.strictEqual(err, null, 'Should not have an error');
                assert.deepStrictEqual(processedValues, [2, 4, 6], 'Should have processed all values');
                done();
            })
        );
    });
});