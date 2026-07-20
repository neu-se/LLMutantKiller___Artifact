let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.flatten with objects', function(done) {
        const source = pull_stream.values([
            {a: 1, b: 2},
            {c: 3, d: 4}
        ]);
        
        const result = [];
        pull_stream(
            source,
            pull_stream.flatten(),
            pull_stream.drain(function(data) {
                result.push(data);
            }, function(err) {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(result, [1, 2, 3, 4]);
                done();
            })
        );
    });
});