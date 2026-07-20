let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.onEnd with transform stream', function(done) {
        let processedValues = [];
        
        pull_stream(
            pull_stream.values([1, 2, 3]),
            pull_stream.map(x => x * 2),
            pull_stream.through(function(data) {
                processedValues.push(data);
                this.queue(data);
            }),
            pull_stream.onEnd(function(err) {
                assert.strictEqual(err, null, 'Should not have an error');
                assert.deepStrictEqual(processedValues, [2, 4, 6], 'Should have processed all values');
                done();
            })
        );
    });
});