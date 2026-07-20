let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filter with string match', function(done) {
        const source = pull_stream.values(['apple', 'banana', 'apple pie', 'orange']);
        const filterString = 'apple';
        const results = [];
        
        pull_stream(
            source,
            pull_stream.filter(item => item.includes(filterString)),
            pull_stream.drain(
                (data) => results.push(data),
                (err) => {
                    assert.strictEqual(err, null);
                    assert.deepStrictEqual(results, ['apple', 'apple pie']);
                    done();
                }
            )
        );
    });
});