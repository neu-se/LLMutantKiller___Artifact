let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.reduce with object accumulation', function(done) {
        pull_stream(
            pull_stream.values([{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}]),
            pull_stream.reduce((acc, item) => {
                acc[item.key] = item.val;
                return acc;
            }, {}, (err, result) => {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(result, {a: 1, b: 2, c: 3});
                done();
            })
        );
    });
});