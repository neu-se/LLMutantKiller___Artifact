let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filter that passes all items', function(done) {
        const source = pull_stream.values(['a', 'b', 'c']);
        const alwaysTrue = () => true;
        const results = [];
        
        pull_stream(
            source,
            pull_stream.filter(alwaysTrue),
            pull_stream.drain(
                (data) => results.push(data),
                (err) => {
                    assert.strictEqual(err, null);
                    assert.deepStrictEqual(results, ['a', 'b', 'c']);
                    done();
                }
            )
        );
    });
});